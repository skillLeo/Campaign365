<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Voter extends BaseModel
{
    use SoftDeletes;

    protected $fillable = [
        'tenant_id', 'first_name', 'last_name', 'address',
        'constituency', 'polling_division', 'parish', 'ward', 'district',
        'phone', 'email', 'age', 'gender', 'ethnicity',
        'voting_history', 'sentiment', 'sentiment_score',
        'turnout_probability', 'persuasion_score', 'custom_tags',
        'preferred_language', 'do_not_contact', 'last_contacted_at',
        'latitude', 'longitude',
    ];

    protected $casts = [
        'voting_history'    => 'array',
        'custom_tags'       => 'array',
        'do_not_contact'    => 'boolean',
        'last_contacted_at' => 'datetime',
    ];

    public function doorKnocks(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DoorKnock::class);
    }

    public function pickupAssignments(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PickupAssignment::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
