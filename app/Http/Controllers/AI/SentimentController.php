<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use App\Models\Voter;
use App\Services\OpenAIService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SentimentController extends Controller
{
    use ApiResponse;

    public function __construct(private OpenAIService $openAI) {}

    public function analyze(Request $request): JsonResponse
    {
        $request->validate(['text' => 'required|string|max:2000']);

        $result = $this->openAI->analyzeSentiment($request->text);
        return $this->success($result);
    }

    public function predictTurnout(Request $request): JsonResponse
    {
        $request->validate(['voter_id' => 'required|exists:voters,id']);

        $voter = Voter::findOrFail($request->voter_id);

        $score = $this->calculateTurnoutScore($voter);
        $voter->update(['turnout_probability' => $score]);

        return $this->success([
            'voter_id'            => $voter->id,
            'turnout_probability' => $score,
        ]);
    }

    private function calculateTurnoutScore(Voter $voter): float
    {
        $score = 50.0;
        if ($voter->sentiment === 'supporter') $score += 20;
        if ($voter->sentiment === 'opposition') $score -= 20;
        if ($voter->age >= 65) $score += 10;
        if ($voter->age >= 25 && $voter->age <= 45) $score += 5;
        if ($voter->last_contacted_at && $voter->last_contacted_at->gt(now()->subDays(7))) $score += 10;
        return min(max(round($score, 2), 0), 100);
    }
}
