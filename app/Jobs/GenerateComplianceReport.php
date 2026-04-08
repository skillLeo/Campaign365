<?php

namespace App\Jobs;

use App\Models\ComplianceReport;
use App\Models\Donation;
use App\Models\Voter;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateComplianceReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 2;

    public function __construct(private int $reportId) {}

    public function handle(): void
    {
        $report = ComplianceReport::find($this->reportId);
        if (!$report) return;

        $tenantId = $report->tenant_id;

        $reportData = [
            'generated_at' => now()->toISOString(),
            'jurisdiction' => $report->jurisdiction,
            'report_type'  => $report->report_type,
        ];

        if (in_array($report->report_type, ['financial_disclosure', 'full'])) {
            $reportData['donations'] = Donation::withoutGlobalScopes()
                ->where('tenant_id', $tenantId)
                ->where('status', 'completed')
                ->get(['donor_name', 'amount', 'currency', 'donated_at', 'payment_gateway'])
                ->toArray();
            $reportData['total_raised'] = Donation::withoutGlobalScopes()
                ->where('tenant_id', $tenantId)
                ->where('status', 'completed')
                ->sum('amount');
        }

        if (in_array($report->report_type, ['voter_data', 'full'])) {
            $reportData['voter_count'] = Voter::withoutGlobalScopes()
                ->where('tenant_id', $tenantId)
                ->count();
        }

        $report->update([
            'report_data'  => $reportData,
            'status'       => 'generated',
            'generated_at' => now(),
        ]);
    }
}
