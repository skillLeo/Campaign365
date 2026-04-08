<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FeatureGateMiddleware
{
    public function handle(Request $request, Closure $next, string $feature): mixed
    {
        if (!app()->has('current_tenant')) {
            return response()->json(['success' => false, 'error' => 'No tenant context'], 400);
        }

        $tenant = app('current_tenant');

        if (!$tenant->hasFeature($feature)) {
            return response()->json([
                'success'          => false,
                'error'            => 'This feature is not available on your subscription plan.',
                'upgrade_required' => true,
            ], 403);
        }

        return $next($request);
    }
}
