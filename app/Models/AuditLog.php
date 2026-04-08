<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = [
        'tenant_id', 'causer_type', 'causer_id', 'action',
        'model_type', 'model_id', 'old_values', 'new_values',
        'ip_address', 'user_agent',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];

    public function causer(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo();
    }

    public static function record(string $action, $model = null, array $oldValues = [], array $newValues = [], $tenantId = null): self
    {
        $user = auth()->user();
        return static::create([
            'tenant_id'   => $tenantId ?? (app()->has('current_tenant') ? app('current_tenant')->id : null),
            'causer_type' => $user ? get_class($user) : null,
            'causer_id'   => $user?->id,
            'action'      => $action,
            'model_type'  => $model ? get_class($model) : null,
            'model_id'    => $model?->id,
            'old_values'  => $oldValues,
            'new_values'  => $newValues,
            'ip_address'  => request()->ip(),
            'user_agent'  => request()->userAgent(),
        ]);
    }
}
