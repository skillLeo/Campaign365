<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    protected $fillable = [
        'survey_id', 'voter_id', 'answers', 'ip_address', 'submitted_at',
    ];

    protected $casts = [
        'answers'      => 'array',
        'submitted_at' => 'datetime',
    ];

    public function survey(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }

    public function voter(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Voter::class);
    }
}
