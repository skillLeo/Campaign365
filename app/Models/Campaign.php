<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends BaseModel
{
    use SoftDeletes;

    protected $fillable = [
        'tenant_id', 'name', 'type', 'status',
        'description', 'start_date', 'end_date',
        'turnout_goal', 'settings',
    ];

    protected $casts = [
        'settings'   => 'array',
        'start_date' => 'date',
        'end_date'   => 'date',
    ];

    public function canvassingLists(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CanvassingList::class);
    }

    public function runners(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Runner::class);
    }

    public function emailCampaigns(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(EmailCampaign::class);
    }
}
