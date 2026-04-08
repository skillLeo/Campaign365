<?php

namespace App\Http\Controllers\GOTV;

use App\Http\Controllers\Controller;
use App\Events\TurnoutUpdated;
use App\Models\OutdoorAgentReport;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OutdoorAgentController extends Controller
{
    use ApiResponse;

    public function report(Request $request): JsonResponse
    {
        $data = $request->validate([
            'polling_station_name' => 'required|string',
            'polling_station_code' => 'nullable|string',
            'constituency'         => 'required|string',
            'expected_voters'      => 'required|integer|min:0',
            'voted_count'          => 'required|integer|min:0',
            'status'               => 'nullable|in:active,slow,closed',
            'notes'                => 'nullable|string',
        ]);

        $data['agent_id'] = $request->user()->id;
        $data['report_time'] = now();
        $data['turnout_percentage'] = $data['expected_voters'] > 0
            ? round($data['voted_count'] / $data['expected_voters'] * 100, 2)
            : 0;

        $report = OutdoorAgentReport::create($data);

        broadcast(new TurnoutUpdated($report));

        return $this->success($report, 'Report submitted', 201);
    }

    public function index(): JsonResponse
    {
        $reports = OutdoorAgentReport::with('agent:id,name')
            ->orderBy('report_time', 'desc')
            ->paginate(50);

        return $this->paginate($reports);
    }
}
