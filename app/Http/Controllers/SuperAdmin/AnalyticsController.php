<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Tenant;
use App\Models\User;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class AnalyticsController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $stats = [
            'active_tenants'  => Tenant::where('status', 'active')->count(),
            'total_tenants'   => Tenant::count(),
            'total_users'     => User::withoutGlobalScopes()->count(),
            'total_voters'    => Voter::withoutGlobalScopes()->count(),
            'active_campaigns' => Campaign::withoutGlobalScopes()->where('status', 'active')->count(),
            'by_plan'         => Tenant::selectRaw('plan, count(*) as count')->groupBy('plan')->get(),
            'by_country'      => Tenant::selectRaw('country, count(*) as count')->whereNotNull('country')->groupBy('country')->get(),
            'recent_tenants'  => Tenant::orderBy('created_at', 'desc')->limit(5)->get(['id', 'name', 'subdomain', 'plan', 'status', 'created_at']),
        ];

        return $this->success($stats);
    }
}
