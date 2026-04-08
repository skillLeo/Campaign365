<?php

namespace App\Http\Controllers\Polling;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveyResponse;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->success(Survey::withCount('responses')->orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'       => 'required|string',
            'description' => 'nullable|string',
            'questions'   => 'required|array|min:1',
            'status'      => 'nullable|in:draft,active,closed',
            'closes_at'   => 'nullable|date|after:now',
        ]);

        $survey = Survey::create($data);
        return $this->success($survey, 'Survey created', 201);
    }

    public function show(int $id): JsonResponse
    {
        return $this->success(Survey::withCount('responses')->findOrFail($id));
    }

    public function respond(Request $request, int $id): JsonResponse
    {
        $survey = Survey::findOrFail($id);

        if ($survey->status !== 'active') {
            return $this->error('Survey is not active', 422);
        }

        $request->validate(['answers' => 'required|array']);

        $response = SurveyResponse::create([
            'survey_id'    => $id,
            'voter_id'     => $request->voter_id,
            'answers'      => $request->answers,
            'ip_address'   => $request->ip(),
            'submitted_at' => now(),
        ]);

        $survey->increment('response_count');

        return $this->success($response, 'Response submitted', 201);
    }

    public function results(int $id): JsonResponse
    {
        $survey = Survey::with('responses')->findOrFail($id);

        $results = [];
        foreach ($survey->questions as $question) {
            $questionAnswers = $survey->responses->pluck('answers')
                ->map(fn($a) => $a[$question['id']] ?? null)
                ->filter()
                ->countBy()
                ->all();

            $results[] = [
                'question' => $question,
                'answers'  => $questionAnswers,
            ];
        }

        return $this->success([
            'survey'         => $survey,
            'response_count' => $survey->responses->count(),
            'results'        => $results,
        ]);
    }
}
