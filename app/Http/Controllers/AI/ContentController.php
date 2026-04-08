<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use App\Services\OpenAIService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    use ApiResponse;

    public function __construct(private OpenAIService $openAI) {}

    public function generateMessage(Request $request): JsonResponse
    {
        $request->validate([
            'voter_profile' => 'required|array',
            'purpose'       => 'required|string|in:gotv,fundraising,canvassing,survey,general',
        ]);

        $message = $this->openAI->generateVoterMessage($request->voter_profile, $request->purpose);
        return $this->success(['message' => $message]);
    }

    public function talkingPoints(Request $request): JsonResponse
    {
        $request->validate([
            'constituency'  => 'required|string',
            'top_concerns'  => 'required|array',
        ]);

        $points = $this->openAI->generateTalkingPoints($request->constituency, $request->top_concerns);
        return $this->success(['talking_points' => $points]);
    }
}
