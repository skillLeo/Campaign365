<?php

namespace App\Events;

use App\Models\OutdoorAgentReport;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class TurnoutUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(public OutdoorAgentReport $report) {}

    public function broadcastOn(): Channel
    {
        return new Channel('tenant.' . $this->report->tenant_id . '.gotv');
    }

    public function broadcastAs(): string
    {
        return 'turnout.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'polling_station' => $this->report->polling_station_name,
            'constituency'    => $this->report->constituency,
            'expected'        => $this->report->expected_voters,
            'voted'           => $this->report->voted_count,
            'percentage'      => $this->report->turnout_percentage,
            'status'          => $this->report->status,
            'timestamp'       => $this->report->report_time->toISOString(),
        ];
    }
}
