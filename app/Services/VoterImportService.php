<?php

namespace App\Services;

use App\Models\Voter;

class VoterImportService
{
    public function import(array $rows, int $tenantId, array $columnMapping = []): array
    {
        $imported = 0;
        $skipped  = 0;
        $errors   = [];

        foreach (array_chunk($rows, 500) as $chunk) {
            foreach ($chunk as $index => $row) {
                try {
                    $mapped = $this->mapColumns($row, $columnMapping);

                    if (empty($mapped['first_name']) && empty($mapped['last_name'])) {
                        $skipped++;
                        continue;
                    }

                    Voter::withoutGlobalScopes()->updateOrCreate(
                        [
                            'tenant_id' => $tenantId,
                            'phone'     => $mapped['phone'] ?? null,
                        ],
                        array_merge($mapped, ['tenant_id' => $tenantId])
                    );

                    $imported++;
                } catch (\Exception $e) {
                    $skipped++;
                    $errors[] = "Row {$index}: " . $e->getMessage();
                }
            }
        }

        return compact('imported', 'skipped', 'errors');
    }

    private function mapColumns(array $row, array $mapping): array
    {
        if (empty($mapping)) {
            return $row;
        }

        $mapped = [];
        foreach ($mapping as $systemField => $csvColumn) {
            if (isset($row[$csvColumn])) {
                $mapped[$systemField] = $row[$csvColumn];
            }
        }

        return $mapped;
    }
}
