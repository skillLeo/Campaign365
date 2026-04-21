<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->configureRateLimiting();
    }

    private function configureRateLimiting(): void
    {
        // Auth endpoints — tight limit to prevent brute-force
        RateLimiter::for('auth', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip());
        });

        // General API — per authenticated user or IP
        RateLimiter::for('api', function (Request $request) {
            return $request->user()
                ? Limit::perMinute(300)->by($request->user()->id)
                : Limit::perMinute(60)->by($request->ip());
        });

        // Bulk operations (import, bulk SMS/email) — tighter limit
        RateLimiter::for('bulk', function (Request $request) {
            return $request->user()
                ? Limit::perHour(20)->by($request->user()->tenant_id ?? $request->ip())
                : Limit::perHour(5)->by($request->ip());
        });

        // GPS updates — high frequency allowed for field workers
        RateLimiter::for('gps', function (Request $request) {
            return $request->user()
                ? Limit::perMinute(60)->by($request->user()->id)
                : Limit::perMinute(10)->by($request->ip());
        });

        // AI endpoints — token-expensive, limited per tenant per hour
        RateLimiter::for('ai', function (Request $request) {
            return $request->user()
                ? Limit::perHour(100)->by($request->user()->tenant_id ?? $request->ip())
                : Limit::perHour(10)->by($request->ip());
        });
    }
}
