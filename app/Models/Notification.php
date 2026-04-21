<?php

namespace App\Models;

class Notification extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'user_id', 'type', 'title', 'body',
        'data', 'action_url', 'is_read', 'is_broadcast', 'read_at',
    ];

    protected $casts = [
        'data'         => 'array',
        'is_read'      => 'boolean',
        'is_broadcast' => 'boolean',
        'read_at'      => 'datetime',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Broadcast a notification to all users of the current tenant.
     */
    public static function broadcast(string $type, string $title, string $body, array $data = [], ?string $actionUrl = null): self
    {
        return static::create([
            'type'         => $type,
            'title'        => $title,
            'body'         => $body,
            'data'         => $data,
            'action_url'   => $actionUrl,
            'is_broadcast' => true,
            'user_id'      => null,
        ]);
    }

    /**
     * Send a notification to a specific user.
     */
    public static function sendTo(int $userId, string $type, string $title, string $body, array $data = []): self
    {
        return static::create([
            'user_id'      => $userId,
            'type'         => $type,
            'title'        => $title,
            'body'         => $body,
            'data'         => $data,
            'is_broadcast' => false,
        ]);
    }
}
