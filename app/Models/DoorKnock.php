<?php

namespace App\Models;

class DoorKnock extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'canvassing_list_id', 'voter_id', 'canvasser_id',
        'result', 'sentiment', 'notes', 'voice_note_url',
        'transcription', 'transcription_sentiment_score',
        'latitude', 'longitude', 'synced', 'knocked_at',
    ];

    protected $casts = [
        'synced'     => 'boolean',
        'knocked_at' => 'datetime',
    ];

    public function canvassingList(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CanvassingList::class);
    }

    public function voter(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Voter::class);
    }

    public function canvasser(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'canvasser_id');
    }
}
