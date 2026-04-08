<?php

namespace App\Services;

use App\Events\PanicButtonPressed;
use App\Jobs\SendBulkSMS;
use App\Models\PanicAlert;
use App\Models\User;

class PanicButtonService
{
    public function __construct(private TwilioService $twilio) {}

    public function trigger(User $user, float $lat, float $lng): PanicAlert
    {
        $alert = PanicAlert::create([
            'tenant_id'    => $user->tenant_id,
            'user_id'      => $user->id,
            'latitude'     => $lat,
            'longitude'    => $lng,
            'status'       => 'active',
            'triggered_at' => now(),
        ]);

        broadcast(new PanicButtonPressed($alert, $user));

        $this->sendEmergencySMS($user, $lat, $lng);

        return $alert;
    }

    private function sendEmergencySMS(User $user, float $lat, float $lng): void
    {
        $managers = User::withoutGlobalScopes()
            ->where('tenant_id', $user->tenant_id)
            ->whereHas('roles', fn($q) => $q->whereIn('name', ['campaign_manager', 'general_secretary', 'region_manager']))
            ->whereNotNull('phone')
            ->pluck('phone')
            ->toArray();

        if (empty($managers)) return;

        $mapsLink = "https://maps.google.com/?q={$lat},{$lng}";
        $message = "🚨 PANIC ALERT: {$user->name} needs immediate help!\nLocation: {$mapsLink}\nTime: " . now()->format('H:i');

        dispatch(new SendBulkSMS($managers, $message));
    }
}
