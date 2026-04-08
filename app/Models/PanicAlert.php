<?php

namespace App\Models;

class PanicAlert extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'user_id', 'latitude', 'longitude',
        'audio_stream_url', 'status', 'resolved_by',
        'triggered_at', 'resolved_at', 'resolution_notes',
    ];

    protected $casts = [
        'triggered_at' => 'datetime',
        'resolved_at'  => 'datetime',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function resolvedBy(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }
}
