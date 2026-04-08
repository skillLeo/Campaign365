<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;

class OpenAIService
{
    public function generateVoterMessage(array $voterProfile, string $purpose): string
    {
        $response = OpenAI::chat()->create([
            'model'    => 'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a political campaign messaging expert. Write personalized, respectful voter outreach messages. Keep them concise (under 160 chars for SMS, or 3 paragraphs for email).'],
                ['role' => 'user', 'content' => "Write a {$purpose} message for a voter with this profile: " . json_encode($voterProfile)],
            ],
            'max_tokens' => 300,
        ]);

        return $response->choices[0]->message->content;
    }

    public function analyzeSentiment(string $text): array
    {
        $response = OpenAI::chat()->create([
            'model'    => 'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => 'Analyze the political sentiment. Return valid JSON only with keys: sentiment (supporter|undecided|opposition), score (0-100), concerns (array of strings).'],
                ['role' => 'user', 'content' => $text],
            ],
            'max_tokens' => 200,
        ]);

        return json_decode($response->choices[0]->message->content, true) ?? [
            'sentiment' => 'unknown',
            'score'     => 50,
            'concerns'  => [],
        ];
    }

    public function generateTalkingPoints(string $constituency, array $topConcerns): string
    {
        $response = OpenAI::chat()->create([
            'model'    => 'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a political strategist. Generate 5 concise candidate talking points.'],
                ['role' => 'user', 'content' => "Generate talking points for {$constituency}. Top voter concerns: " . implode(', ', $topConcerns)],
            ],
            'max_tokens' => 500,
        ]);

        return $response->choices[0]->message->content;
    }
}
