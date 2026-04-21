<?php

use Illuminate\Support\Facades\Route;

// ── PUBLIC AUTH ROUTES ─────────────────────────────────────────
Route::prefix('v1')->group(function () {

    // Tenant auth — rate limited
    Route::middleware('throttle:auth')->group(function () {
        Route::post('/auth/login', [\App\Http\Controllers\Auth\LoginController::class, 'login']);
        Route::post('/auth/forgot-password', [\App\Http\Controllers\Auth\ForgotPasswordController::class, 'send']);
        Route::post('/auth/verify-otp', [\App\Http\Controllers\Auth\OTPController::class, 'verify']);
        Route::post('/auth/reset-password', [\App\Http\Controllers\Auth\ForgotPasswordController::class, 'reset']);
    });

    // Tenant branding (public — needed by React before login to load party colors)
    Route::get('/tenant/branding', function () {
        if (!app()->has('current_tenant')) {
            return response()->json(['success' => false, 'error' => 'No tenant'], 404);
        }
        $t = app('current_tenant');
        return response()->json(['success' => true, 'data' => [
            'name'            => $t->name,
            'logo_url'        => $t->logo_url,
            'primary_color'   => $t->primary_color,
            'secondary_color' => $t->secondary_color,
            'font'            => $t->font,
            'subdomain'       => $t->subdomain,
            'country'         => $t->country,
            'jurisdiction'    => $t->jurisdiction,
        ]]);
    })->middleware('tenant');

    // ── AUTHENTICATED TENANT ROUTES ──────────────────────────────
    Route::middleware(['auth:sanctum', 'tenant', 'throttle:api'])->group(function () {

        // Auth
        Route::post('/auth/logout', [\App\Http\Controllers\Auth\LoginController::class, 'logout']);
        Route::get('/auth/me', [\App\Http\Controllers\Auth\LoginController::class, 'me']);
        Route::put('/auth/profile', [\App\Http\Controllers\UserController::class, 'updateProfile']);

        // Dashboard
        Route::get('/dashboard/stats', [\App\Http\Controllers\DashboardController::class, 'stats']);
        Route::get('/dashboard/live-map', [\App\Http\Controllers\DashboardController::class, 'liveMap']);

        // ── VOTER MANAGEMENT ──────────────────────────────────────
        Route::prefix('voters')->group(function () {
            Route::get('/',         [\App\Http\Controllers\Voter\VoterController::class, 'index']);
            Route::post('/',        [\App\Http\Controllers\Voter\VoterController::class, 'store']);
            Route::get('/stats',    [\App\Http\Controllers\Voter\VoterController::class, 'stats']);
            Route::get('/export',   [\App\Http\Controllers\Voter\VoterController::class, 'export']);
            Route::get('/segments', [\App\Http\Controllers\Voter\SegmentController::class, 'index']);
            Route::post('/segment', [\App\Http\Controllers\Voter\SegmentController::class, 'create']);
            Route::post('/import',  [\App\Http\Controllers\Voter\ImportController::class, 'import'])
                ->middleware('throttle:bulk');
            Route::post('/bulk-update', [\App\Http\Controllers\Voter\VoterController::class, 'bulkUpdate']);
            Route::get('/{id}',     [\App\Http\Controllers\Voter\VoterController::class, 'show']);
            Route::put('/{id}',     [\App\Http\Controllers\Voter\VoterController::class, 'update']);
            Route::delete('/{id}',  [\App\Http\Controllers\Voter\VoterController::class, 'destroy']);
        });

        // ── CAMPAIGNS ─────────────────────────────────────────────
        Route::apiResource('campaigns', \App\Http\Controllers\CampaignController::class);

        // ── CANVASSING (FIELD OPERATIONS) ─────────────────────────
        Route::prefix('canvassing')->group(function () {
            Route::get('/lists',                  [\App\Http\Controllers\Field\CanvasserController::class, 'lists']);
            Route::post('/lists',                 [\App\Http\Controllers\Field\CanvasserController::class, 'createList']);
            Route::get('/lists/{id}',             [\App\Http\Controllers\Field\CanvasserController::class, 'showList']);
            Route::post('/lists/{id}/activate',   [\App\Http\Controllers\Field\CanvasserController::class, 'activateList']);
            Route::get('/lists/{id}/download-offline', [\App\Http\Controllers\Field\CanvasserController::class, 'downloadOffline']);
            Route::post('/doorknock',             [\App\Http\Controllers\Field\CanvasserController::class, 'recordDoorKnock']);
            Route::post('/sync',                  [\App\Http\Controllers\Field\CanvasserController::class, 'syncOfflineData']);
            Route::post('/voice-note',            [\App\Http\Controllers\AI\TranscriptionController::class, 'transcribe']);
        });

        // ── TURF MANAGEMENT ───────────────────────────────────────
        Route::prefix('turf')->group(function () {
            Route::get('/',                [\App\Http\Controllers\Field\TurfController::class, 'index']);
            Route::post('/',               [\App\Http\Controllers\Field\TurfController::class, 'store']);
            Route::post('/{id}/assign',    [\App\Http\Controllers\Field\TurfController::class, 'assign']);
            Route::get('/walklist/{id}',   [\App\Http\Controllers\Field\TurfController::class, 'generateWalkList']);
        });

        // ── GPS TRACKING ──────────────────────────────────────────
        Route::prefix('tracking')->group(function () {
            Route::post('/gps',              [\App\Http\Controllers\Tracking\GPSController::class, 'update'])
                ->middleware('throttle:gps');
            Route::get('/live',              [\App\Http\Controllers\Tracking\GPSController::class, 'live']);
            Route::post('/panic',            [\App\Http\Controllers\Tracking\PanicController::class, 'trigger']);
            Route::put('/panic/{id}/resolve', [\App\Http\Controllers\Tracking\PanicController::class, 'resolve']);
            Route::get('/panic/active',      [\App\Http\Controllers\Tracking\PanicController::class, 'active']);
        });

        // ── RUNNERS ───────────────────────────────────────────────
        Route::prefix('runners')->group(function () {
            Route::get('/',                   [\App\Http\Controllers\Field\RunnerController::class, 'index']);
            Route::post('/',                  [\App\Http\Controllers\Field\RunnerController::class, 'store']);
            Route::post('/assign',            [\App\Http\Controllers\Field\RunnerController::class, 'assign']);
            Route::get('/{id}/location',      [\App\Http\Controllers\Field\RunnerController::class, 'location']);
            Route::put('/{id}/pickup-status', [\App\Http\Controllers\Field\RunnerController::class, 'updatePickupStatus']);
        });

        // ── GOTV (GET OUT THE VOTE) ───────────────────────────────
        Route::prefix('gotv')->group(function () {
            Route::get('/turnout',           [\App\Http\Controllers\GOTV\GOTVController::class, 'turnout']);
            Route::get('/polling-stations',  [\App\Http\Controllers\GOTV\GOTVController::class, 'pollingStations']);
            Route::post('/outdoor-report',   [\App\Http\Controllers\GOTV\OutdoorAgentController::class, 'report']);
            Route::get('/outdoor-reports',   [\App\Http\Controllers\GOTV\OutdoorAgentController::class, 'index']);
            Route::post('/end-day-report',   [\App\Http\Controllers\GOTV\GOTVController::class, 'endDayReport']);
        });

        // ── COMMUNICATIONS ────────────────────────────────────────
        Route::prefix('communications')->group(function () {
            Route::post('/email/send',      [\App\Http\Controllers\Communications\EmailController::class, 'send'])
                ->middleware('throttle:bulk');
            Route::get('/email/campaigns',  [\App\Http\Controllers\Communications\EmailController::class, 'campaigns']);
            Route::post('/sms/send',        [\App\Http\Controllers\Communications\SMSController::class, 'send'])
                ->middleware('throttle:bulk');
            Route::get('/sms/campaigns',    [\App\Http\Controllers\Communications\SMSController::class, 'campaigns']);
            Route::post('/whatsapp/send',   [\App\Http\Controllers\Communications\WhatsAppController::class, 'send'])
                ->middleware(['feature:whatsapp', 'throttle:bulk']);
        });

        // ── FUNDRAISING ───────────────────────────────────────────
        Route::prefix('fundraising')->middleware('feature:fundraising')->group(function () {
            Route::get('/donations',  [\App\Http\Controllers\Fundraising\DonationController::class, 'index']);
            Route::post('/donations', [\App\Http\Controllers\Fundraising\DonationController::class, 'store']);
            Route::get('/donors',     [\App\Http\Controllers\Fundraising\DonationController::class, 'donors']);
            Route::get('/stats',      [\App\Http\Controllers\Fundraising\DonationController::class, 'stats']);
            Route::apiResource('events', \App\Http\Controllers\Fundraising\EventController::class);
        });

        // ── SURVEYS & POLLING ─────────────────────────────────────
        Route::prefix('surveys')->middleware('feature:polling')->group(function () {
            Route::get('/',               [\App\Http\Controllers\Polling\SurveyController::class, 'index']);
            Route::post('/',              [\App\Http\Controllers\Polling\SurveyController::class, 'store']);
            Route::get('/{id}',           [\App\Http\Controllers\Polling\SurveyController::class, 'show']);
            Route::post('/{id}/respond',  [\App\Http\Controllers\Polling\SurveyController::class, 'respond']);
            Route::get('/{id}/results',   [\App\Http\Controllers\Polling\SurveyController::class, 'results']);
        });

        // ── AI FEATURES ───────────────────────────────────────────
        Route::prefix('ai')->middleware(['feature:openai', 'throttle:ai'])->group(function () {
            Route::post('/generate-message',  [\App\Http\Controllers\AI\ContentController::class, 'generateMessage']);
            Route::post('/talking-points',    [\App\Http\Controllers\AI\ContentController::class, 'talkingPoints']);
            Route::post('/sentiment',         [\App\Http\Controllers\AI\SentimentController::class, 'analyze']);
            Route::post('/predict-turnout',   [\App\Http\Controllers\AI\SentimentController::class, 'predictTurnout']);
        });

        // ── REPORTS ───────────────────────────────────────────────
        Route::prefix('reports')->group(function () {
            Route::get('/performance',          [\App\Http\Controllers\Reports\ComplianceController::class, 'performance']);
            Route::get('/compliance',           [\App\Http\Controllers\Reports\ComplianceController::class, 'compliance'])
                ->middleware('feature:compliance_full');
            Route::post('/compliance/generate', [\App\Http\Controllers\Reports\ComplianceController::class, 'generate'])
                ->middleware('feature:compliance_full');
            Route::get('/canvassing',           [\App\Http\Controllers\Reports\ComplianceController::class, 'canvassing']);
        });

        // ── TEAM / USER MANAGEMENT ────────────────────────────────
        Route::prefix('team')->group(function () {
            Route::get('/',                    [\App\Http\Controllers\UserController::class, 'index']);
            Route::post('/',                   [\App\Http\Controllers\UserController::class, 'store']);
            Route::get('/roles',               [\App\Http\Controllers\UserController::class, 'roles']);
            Route::get('/{id}',                [\App\Http\Controllers\UserController::class, 'show']);
            Route::put('/{id}',                [\App\Http\Controllers\UserController::class, 'update']);
            Route::delete('/{id}',             [\App\Http\Controllers\UserController::class, 'destroy']);
            Route::post('/{id}/reset-password', [\App\Http\Controllers\UserController::class, 'resetPassword']);
        });

        // ── NOTIFICATIONS ─────────────────────────────────────────
        Route::prefix('notifications')->group(function () {
            Route::get('/',                [\App\Http\Controllers\NotificationController::class, 'index']);
            Route::get('/unread-count',    [\App\Http\Controllers\NotificationController::class, 'unreadCount']);
            Route::post('/broadcast',      [\App\Http\Controllers\NotificationController::class, 'broadcast']);
            Route::put('/{id}/read',       [\App\Http\Controllers\NotificationController::class, 'markRead']);
            Route::post('/mark-all-read',  [\App\Http\Controllers\NotificationController::class, 'markAllRead']);
            Route::delete('/{id}',         [\App\Http\Controllers\NotificationController::class, 'destroy']);
        });

        // ── TENANT SETTINGS ───────────────────────────────────────
        Route::prefix('settings')->group(function () {
            Route::get('/',              [\App\Http\Controllers\TenantSettingsController::class, 'index']);
            Route::put('/branding',      [\App\Http\Controllers\TenantSettingsController::class, 'updateBranding']);
            Route::put('/general',       [\App\Http\Controllers\TenantSettingsController::class, 'updateSettings']);
            Route::post('/logo',         [\App\Http\Controllers\TenantSettingsController::class, 'uploadLogo']);
            Route::get('/plan-features', [\App\Http\Controllers\TenantSettingsController::class, 'planFeatures']);
        });

    }); // end tenant auth middleware

}); // end v1 prefix

// ── SUPER ADMIN ROUTES ────────────────────────────────────────
Route::prefix('v1/super')->group(function () {

    Route::middleware('throttle:auth')->group(function () {
        Route::post('/auth/login', [\App\Http\Controllers\Auth\SuperAdminLoginController::class, 'login']);
    });

    Route::middleware(['auth:super_admin_sanctum', 'super_admin', 'throttle:api'])->group(function () {
        Route::post('/auth/logout', [\App\Http\Controllers\Auth\SuperAdminLoginController::class, 'logout']);
        Route::get('/auth/me',     [\App\Http\Controllers\Auth\SuperAdminLoginController::class, 'me']);

        // Tenant management
        Route::get('/tenants',                [\App\Http\Controllers\SuperAdmin\TenantController::class, 'index']);
        Route::post('/tenants',               [\App\Http\Controllers\SuperAdmin\TenantController::class, 'store']);
        Route::get('/tenants/{id}',           [\App\Http\Controllers\SuperAdmin\TenantController::class, 'show']);
        Route::put('/tenants/{id}',           [\App\Http\Controllers\SuperAdmin\TenantController::class, 'update']);
        Route::delete('/tenants/{id}',        [\App\Http\Controllers\SuperAdmin\TenantController::class, 'destroy']);
        Route::put('/tenants/{id}/subscription', [\App\Http\Controllers\SuperAdmin\SubscriptionController::class, 'update']);
        Route::put('/tenants/{id}/features',  [\App\Http\Controllers\SuperAdmin\SubscriptionController::class, 'updateFeatures']);
        Route::put('/tenants/{id}/branding',  [\App\Http\Controllers\SuperAdmin\TenantController::class, 'updateBranding']);
        Route::put('/tenants/{id}/status',    [\App\Http\Controllers\SuperAdmin\TenantController::class, 'updateStatus']);

        // Platform overview
        Route::get('/analytics',        [\App\Http\Controllers\SuperAdmin\AnalyticsController::class, 'index']);
        Route::get('/billing',          [\App\Http\Controllers\SuperAdmin\BillingController::class, 'index']);
        Route::get('/audit-logs',       [\App\Http\Controllers\SuperAdmin\AuditController::class, 'index']);
        Route::get('/platform-health',  [\App\Http\Controllers\SuperAdmin\HealthController::class, 'index']);
    });
});
