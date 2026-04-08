<?php

namespace App\Models;

class CanvassingList extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'campaign_id', 'canvasser_id', 'name',
        'turf_geojson', 'area_name', 'status',
        'activated_at', 'completed_at', 'total_voters',
        'visited_count', 'walk_date',
    ];

    protected $casts = [
        'turf_geojson' => 'array',
        'activated_at' => 'datetime',
        'completed_at' => 'datetime',
        'walk_date'    => 'date',
    ];

    public function campaign(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    public function canvasser(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'canvasser_id');
    }

    public function doorKnocks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DoorKnock::class);
    }
}
