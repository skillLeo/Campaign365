<?php

namespace App\Services;

use App\Events\GPSLocationUpdated;
use App\Models\GpsLog;
use App\Models\User;

class GPSTrackingService
{
    public function updateLocation(User $user, float $lat, float $lng, ?float $accuracy = null): GpsLog
    {
        $log = GpsLog::create([
            'tenant_id' => $user->tenant_id,
            'user_id'   => $user->id,
            'latitude'  => $lat,
            'longitude' => $lng,
            'accuracy'  => $accuracy,
            'logged_at' => now(),
        ]);

        broadcast(new GPSLocationUpdated($user, $lat, $lng))->toOthers();

        return $log;
    }

    public function getLiveLocations(): array
    {
        return GpsLog::with('user:id,name,avatar_url')
            ->where('logged_at', '>=', now()->subMinutes(5))
            ->select('user_id', 'latitude', 'longitude', 'logged_at')
            ->latest('logged_at')
            ->get()
            ->groupBy('user_id')
            ->map(fn($logs) => $logs->first())
            ->values()
            ->toArray();
    }
}
