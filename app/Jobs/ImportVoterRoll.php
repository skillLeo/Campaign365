<?php

namespace App\Jobs;

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
    public int $timeout = 3600;

    public function __construct(
        private string $filePath,
        private int $tenantId,
        private array $columnMapping = []
    ) {}

    public function handle(VoterImportService $importService): void
    {
        $fullPath = Storage::path($this->filePath);

        if (!file_exists($fullPath)) {
            \Log::error("Import file not found: {$fullPath}");
            return;
        }

        $rows = $this->parseFile($fullPath);
        $result = $importService->import($rows, $this->tenantId, $this->columnMapping);

        \Log::info("Voter import complete for tenant {$this->tenantId}: " . json_encode($result));

        Storage::delete($this->filePath);
    }

    private function parseFile(string $path): array
    {
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        $rows = [];

        if ($ext === 'csv' || $ext === 'txt') {
            $handle = fopen($path, 'r');
            $headers = fgetcsv($handle);
            while (($row = fgetcsv($handle)) !== false) {
                if ($headers) {
                    $rows[] = array_combine($headers, $row);
                }
            }
            fclose($handle);
        }

        return $rows;
    }
}
