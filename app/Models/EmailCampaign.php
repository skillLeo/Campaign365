<?php

namespace App\Models;

class EmailCampaign extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'campaign_id', 'name', 'subject', 'body',
        'from_name', 'from_email', 'segment_filters', 'recipient_count',
        'status', 'scheduled_at', 'sent_at',
        'open_count', 'click_count', 'unsubscribe_count',
    ];

    protected $casts = [
        'segment_filters' => 'array',
        'scheduled_at'    => 'datetime',
        'sent_at'         => 'datetime',
    ];

    public function campaign(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }
}
