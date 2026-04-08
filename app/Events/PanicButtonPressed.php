<?php

namespace App\Events;

use App\Models\PanicAlert;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class PanicButtonPressed implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(
        public PanicAlert $alert,
        public User $user
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('tenant.' . $this->user->tenant_id . '.alerts');
    }

    public function broadcastAs(): string
    {
        return 'panic.alert';
    }

    public function broadcastWith(): array
    {
        return [
            'alert_id'  => $this->alert->id,
            'user_id'   => $this->user->id,
            'name'      => $this->user->name,
            'role'      => $this->user->getRoleNames()->first(),
            'phone'     => $this->user->phone,
            'latitude'  => $this->alert->latitude,
            'longitude' => $this->alert->longitude,
            'maps_url'  => "https://maps.google.com/?q={$this->alert->latitude},{$this->alert->longitude}",
            'timestamp' => $this->alert->triggered_at->toISOString(),
        ];
    }
}
