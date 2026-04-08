<?php

namespace App\Models;

class Event extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'title', 'description', 'location',
        'latitude', 'longitude', 'starts_at', 'ends_at',
        'capacity', 'rsvp_count', 'status',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at'   => 'datetime',
    ];
}
