<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use App\Models\DoorKnock;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TranscriptionController extends Controller
{
    use ApiResponse;

    public function transcribe(Request $request): JsonResponse
    {
        $request->validate([
            'door_knock_id'  => 'required|exists:door_knocks,id',
            'transcription'  => 'required|string',
            'voice_note'     => 'nullable|file|mimes:m4a,mp3,wav,webm|max:10240',
        ]);

        $doorKnock = DoorKnock::findOrFail($request->door_knock_id);

        $voiceNoteUrl = null;
        if ($request->hasFile('voice_note')) {
            $tenant = app('current_tenant');
            $path = $request->file('voice_note')->store("voice_notes/{$tenant->id}", 'local');
            $voiceNoteUrl = $path;
        }

        $doorKnock->update([
            'transcription'  => $request->transcription,
            'voice_note_url' => $voiceNoteUrl,
        ]);

        return $this->success($doorKnock, 'Transcription saved');
    }
}
