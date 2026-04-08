<?php

namespace App\Models;

class Runner extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'user_id', 'campaign_id',
        'vehicle_type', 'vehicle_plate', 'capacity', 'status',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function campaign(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    public function pickupAssignments(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PickupAssignment::class);
    }
}
