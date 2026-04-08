<?php

namespace App\Models;

class Survey extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'title', 'description', 'questions',
        'status', 'closes_at', 'response_count',
    ];

    protected $casts = [
        'questions' => 'array',
        'closes_at' => 'datetime',
    ];

    public function responses(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(SurveyResponse::class);
    }
}
