<?php

namespace App\Models;

class SmsCampaign extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'name', 'message', 'segment_filters',
        'recipient_count', 'channel', 'status',
        'scheduled_at', 'sent_at', 'delivered_count', 'failed_count',
    ];

    protected $casts = [
        'segment_filters' => 'array',
        'scheduled_at'    => 'datetime',
        'sent_at'         => 'datetime',
    ];
}
