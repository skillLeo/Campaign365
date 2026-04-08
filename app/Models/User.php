<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes, HasRoles;

    protected $fillable = [
        'tenant_id', 'name', 'email', 'phone', 'password',
        'avatar_url', 'status', 'fcm_token', 'otp',
        'otp_expires_at', 'last_login_at',
    ];

    protected $hidden = ['password', 'remember_token', 'otp'];

    protected function casts(): array
    {
        return [
            'otp_expires_at' => 'datetime',
            'last_login_at'  => 'datetime',
            'password'       => 'hashed',
        ];
    }

    protected static function booted(): void
    {
        static::addGlobalScope('tenant', function (Builder $query) {
            if (app()->has('current_tenant')) {
                $query->where('users.tenant_id', app('current_tenant')->id);
            }
        });

        static::creating(function ($model) {
            if (app()->has('current_tenant') && empty($model->tenant_id)) {
                $model->tenant_id = app('current_tenant')->id;
            }
        });
    }

    public function tenant(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function doorKnocks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DoorKnock::class, 'canvasser_id');
    }

    public function gpsLogs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(GpsLog::class);
    }

    public function runner(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Runner::class);
    }
}
