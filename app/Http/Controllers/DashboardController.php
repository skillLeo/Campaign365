<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\DoorKnock;
use App\Models\GpsLog;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use ApiResponse;

    public function stats(Request $request): JsonResponse
    {
        $tenant = app('current_tenant');

        $stats = [
            'active_campaigns'   => Campaign::where('status', 'active')->count(),
            'total_voters'       => Voter::count(),
            'voters_contacted'   => DoorKnock::whereIn('result', ['answered', 'callback'])->distinct('voter_id')->count(),
            'turnout_goal'       => Campaign::where('status', 'active')->sum('turnout_goal'),
            'canvassers_active'  => GpsLog::where('logged_at', '>=', now()->subMinutes(30))
                                          ->distinct('user_id')
                                          ->count(),
            'doors_knocked_today' => DoorKnock::whereDate('knocked_at', today())->count(),
            'sentiment_breakdown' => [
                'supporter'  => Voter::where('sentiment', 'supporter')->count(),
                'undecided'  => Voter::where('sentiment', 'undecided')->count(),
                'opposition' => Voter::where('sentiment', 'opposition')->count(),
                'unknown'    => Voter::where('sentiment', 'unknown')->count(),
            ],
        ];

        return $this->success($stats);
    }

    public function liveMap(Request $request): JsonResponse
    {
        $locations = GpsLog::with('user:id,name,avatar_url')
            ->where('logged_at', '>=', now()->subMinutes(5))
            ->orderBy('logged_at', 'desc')
            ->get()
            ->groupBy('user_id')
            ->map(fn($logs) => $logs->first())
            ->values();

        return $this->success($locations);
    }
}
