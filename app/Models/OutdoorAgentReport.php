<?php

namespace App\Models;

class OutdoorAgentReport extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'agent_id', 'polling_station_name',
        'polling_station_code', 'constituency', 'expected_voters',
        'voted_count', 'turnout_percentage', 'status', 'notes', 'report_time',
    ];

    protected $casts = [
        'report_time' => 'datetime',
    ];

    public function agent(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'agent_id');
    }
}
