<?php

namespace App\Models;

class PickupAssignment extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'runner_id', 'voter_id', 'scheduled_time',
        'pickup_status', 'pickup_address', 'destination_address',
        'passenger_count', 'notes', 'completed_at',
    ];

    protected $casts = [
        'scheduled_time' => 'datetime',
        'completed_at'   => 'datetime',
    ];

    public function runner(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Runner::class);
    }

    public function voter(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Voter::class);
    }
}
