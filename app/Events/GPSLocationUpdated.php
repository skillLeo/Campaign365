<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class GPSLocationUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(
        public User $user,
        public float $latitude,
        public float $longitude
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('tenant.' . $this->user->tenant_id . '.tracking');
    }

    public function broadcastAs(): string
    {
        return 'gps.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'user_id'   => $this->user->id,
            'name'      => $this->user->name,
            'role'      => $this->user->getRoleNames()->first(),
            'latitude'  => $this->latitude,
            'longitude' => $this->longitude,
            'timestamp' => now()->toISOString(),
        ];
    }
}
