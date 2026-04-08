<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;

class TenantMiddleware
{
    public function handle(Request $request, Closure $next): mixed
    {
        $host = $request->getHost();

        if ($host === config('app.super_admin_domain', 'admin.campaign365.app')) {
            return $next($request);
        }

        $parts = explode('.', $host);
        $subdomain = count($parts) >= 3 ? $parts[0] : null;

        if (!$subdomain) {
            return response()->json(['success' => false, 'error' => 'Tenant not found'], 404);
        }

        $tenant = Tenant::withoutGlobalScopes()
            ->where(function ($q) use ($subdomain, $host) {
                $q->where('subdomain', $subdomain)
                  ->orWhere('custom_domain', $host);
            })
            ->where('status', 'active')
            ->first();

        if (!$tenant) {
            return response()->json(['success' => false, 'error' => 'Tenant not found or inactive'], 404);
        }

        app()->instance('current_tenant', $tenant);
        config(['current_tenant_id' => $tenant->id]);

        return $next($request);
    }
}
