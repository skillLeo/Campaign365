<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    protected static function booted(): void
    {
        static::addGlobalScope('tenant', function (Builder $query) {
            if (app()->has('current_tenant')) {
                $query->where(
                    (new static())->getTable() . '.tenant_id',
                    app('current_tenant')->id
                );
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
}
