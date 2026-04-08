<?php

namespace App\Models;

class GpsLog extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'user_id', 'latitude', 'longitude',
        'accuracy', 'speed', 'activity', 'logged_at',
    ];

    protected $casts = [
        'logged_at' => 'datetime',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
