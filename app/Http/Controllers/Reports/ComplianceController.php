<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Jobs\GenerateComplianceReport;
use App\Models\Campaign;
use App\Models\ComplianceReport;
use App\Models\DoorKnock;
use App\Models\Donation;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ComplianceController extends Controller
{
    use ApiResponse;

    public function performance(): JsonResponse
    {
        $data = [
            'campaigns'       => Campaign::withCount(['canvassingLists', 'runners'])->get(),
            'doors_knocked'   => DoorKnock::count(),
            'sentiment'       => [
                'supporter'  => \App\Models\Voter::where('sentiment', 'supporter')->count(),
                'undecided'  => \App\Models\Voter::where('sentiment', 'undecided')->count(),
                'opposition' => \App\Models\Voter::where('sentiment', 'opposition')->count(),
            ],
            'total_donations' => Donation::where('status', 'completed')->sum('amount'),
        ];

        return $this->success($data);
    }

    public function compliance(): JsonResponse
    {
        $reports = ComplianceReport::orderBy('created_at', 'desc')->get();
        return $this->success($reports);
    }

    public function generate(Request $request): JsonResponse
    {
        $request->validate([
            'jurisdiction' => 'required|in:jamaica,uk,canada,caribbean',
            'report_type'  => 'required|in:financial_disclosure,voter_data,campaign_activity,full',
        ]);

        $report = ComplianceReport::create([
            'jurisdiction' => $request->jurisdiction,
            'report_type'  => $request->report_type,
            'report_data'  => [],
            'status'       => 'draft',
        ]);

        dispatch(new GenerateComplianceReport($report->id));

        return $this->success($report, 'Compliance report generation queued', 201);
    }

    public function canvassing(): JsonResponse
    {
        $data = DoorKnock::with(['voter:id,first_name,last_name,address', 'canvasser:id,name'])
            ->orderBy('knocked_at', 'desc')
            ->paginate(50);

        return $this->paginate($data);
    }
}
