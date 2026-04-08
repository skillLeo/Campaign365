<?php

namespace App\Http\Controllers\GOTV;

use App\Http\Controllers\Controller;
use App\Models\OutdoorAgentReport;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GOTVController extends Controller
{
    use ApiResponse;

    public function turnout(): JsonResponse
    {
        $reports = OutdoorAgentReport::selectRaw(
            'constituency,
             SUM(expected_voters) as expected,
             SUM(voted_count) as voted,
             ROUND(SUM(voted_count) / NULLIF(SUM(expected_voters), 0) * 100, 2) as percentage'
        )
        ->groupBy('constituency')
        ->orderBy('percentage', 'desc')
        ->get();

        $totals = OutdoorAgentReport::selectRaw(
            'SUM(expected_voters) as total_expected,
             SUM(voted_count) as total_voted,
             ROUND(SUM(voted_count) / NULLIF(SUM(expected_voters), 0) * 100, 2) as overall_percentage'
        )->first();

        return $this->success([
            'by_constituency' => $reports,
            'totals'          => $totals,
        ]);
    }

    public function pollingStations(): JsonResponse
    {
        $stations = OutdoorAgentReport::with('agent:id,name')
            ->orderBy('report_time', 'desc')
            ->get()
            ->groupBy('polling_station_code')
            ->map(fn($reports) => $reports->first())
            ->values();

        return $this->success($stations);
    }

    public function endDayReport(Request $request): JsonResponse
    {
        $summary = [
            'date'           => today()->toDateString(),
            'total_stations' => OutdoorAgentReport::distinct('polling_station_code')->count(),
            'total_expected' => OutdoorAgentReport::sum('expected_voters'),
            'total_voted'    => OutdoorAgentReport::sum('voted_count'),
            'by_constituency' => OutdoorAgentReport::selectRaw(
                'constituency, SUM(expected_voters) as expected, SUM(voted_count) as voted'
            )->groupBy('constituency')->get(),
        ];

        return $this->success($summary, 'End of day report generated');
    }
}
