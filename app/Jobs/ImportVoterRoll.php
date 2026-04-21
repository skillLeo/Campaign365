<?php

namespace App\Jobs;

use App\Models\Notification;
use App\Models\Tenant;
use App\Models\User;
use App\Services\VoterImportService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ImportVoterRoll implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 2;
    public int $timeout = 3600; // 1 hour for large files

    public function __construct(
        private string $filePath,
        private int    $tenantId,
        private array  $columnMapping = [],
        private ?int   $importedByUserId = null
    ) {}

    public function handle(VoterImportService $importService): void
    {
        $fullPath = Storage::path($this->filePath);

        if (!file_exists($fullPath)) {
            \Log::error("ImportVoterRoll: file not found at {$fullPath}");
            $this->notifyFailure('Import file was not found on disk.');
            return;
        }

        try {
            $rows = $this->parseFile($fullPath);

            if (empty($rows)) {
                $this->notifyFailure('The uploaded file contained no valid data rows.');
                Storage::delete($this->filePath);
                return;
            }

            // Inject tenant context for the service
            $tenant = Tenant::find($this->tenantId);
            if ($tenant) {
                app()->instance('current_tenant', $tenant);
                config(['current_tenant_id' => $tenant->id]);
            }

            $result = $importService->import($rows, $this->tenantId, $this->columnMapping);

            \Log::info("ImportVoterRoll complete for tenant {$this->tenantId}: " . json_encode($result));

            $this->notifySuccess($result, count($rows));

        } catch (\Exception $e) {
            \Log::error("ImportVoterRoll failed for tenant {$this->tenantId}: " . $e->getMessage());
            $this->notifyFailure($e->getMessage());
        } finally {
            Storage::delete($this->filePath);
        }
    }

    private function parseFile(string $path): array
    {
        $ext  = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        $rows = [];

        if (in_array($ext, ['csv', 'txt'])) {
            $rows = $this->parseCsv($path);
        } elseif ($ext === 'xlsx') {
            $rows = $this->parseXlsx($path);
        } else {
            throw new \InvalidArgumentException("Unsupported file format: {$ext}");
        }

        return $rows;
    }

    private function parseCsv(string $path): array
    {
        $rows   = [];
        $handle = fopen($path, 'r');

        if (!$handle) {
            throw new \RuntimeException("Cannot open CSV file for reading.");
        }

        // Detect BOM and skip it
        $bom = fread($handle, 3);
        if ($bom !== "\xEF\xBB\xBF") {
            fseek($handle, 0);
        }

        $headers = fgetcsv($handle);
        if (!$headers) {
            fclose($handle);
            return [];
        }

        // Normalize headers: trim whitespace, lowercase
        $headers = array_map(fn($h) => strtolower(trim((string) $h)), $headers);

        while (($row = fgetcsv($handle)) !== false) {
            if (count($row) !== count($headers)) continue;
            $mapped = array_combine($headers, array_map('trim', $row));
            if (!empty(array_filter($mapped))) {
                $rows[] = $mapped;
            }
        }

        fclose($handle);
        return $rows;
    }

    private function parseXlsx(string $path): array
    {
        // Uses maatwebsite/excel (already in composer.json)
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($path);
        $sheet       = $spreadsheet->getActiveSheet();
        $data        = $sheet->toArray(null, true, true, false);

        if (empty($data)) return [];

        // First row = headers
        $headers = array_map(fn($h) => strtolower(trim((string) $h)), array_shift($data));

        $rows = [];
        foreach ($data as $row) {
            if (count($row) < count($headers)) {
                $row = array_pad($row, count($headers), null);
            }
            $mapped = array_combine($headers, array_map(fn($v) => trim((string) ($v ?? '')), $row));
            if (!empty(array_filter($mapped))) {
                $rows[] = $mapped;
            }
        }

        return $rows;
    }

    private function notifySuccess(array $result, int $totalRows): void
    {
        try {
            // Set tenant context for Notification model
            $tenant = Tenant::find($this->tenantId);
            if (!$tenant) return;

            app()->instance('current_tenant', $tenant);
            config(['current_tenant_id' => $tenant->id]);

            $title = "Voter Import Complete";
            $body  = "Successfully imported {$result['imported']} voters from {$totalRows} rows.";
            if ($result['skipped'] > 0) {
                $body .= " {$result['skipped']} rows were skipped.";
            }

            Notification::broadcast('system', $title, $body, [
                'imported'    => $result['imported'],
                'skipped'     => $result['skipped'],
                'errors'      => array_slice($result['errors'] ?? [], 0, 5),
                'total_rows'  => $totalRows,
            ], '/voters');

        } catch (\Exception $e) {
            \Log::warning("ImportVoterRoll: could not send success notification: " . $e->getMessage());
        }
    }

    private function notifyFailure(string $reason): void
    {
        try {
            $tenant = Tenant::find($this->tenantId);
            if (!$tenant) return;

            app()->instance('current_tenant', $tenant);
            config(['current_tenant_id' => $tenant->id]);

            Notification::broadcast('urgent', 'Voter Import Failed', $reason, [
                'reason' => $reason,
            ]);
        } catch (\Exception $e) {
            \Log::warning("ImportVoterRoll: could not send failure notification: " . $e->getMessage());
        }
    }
}
