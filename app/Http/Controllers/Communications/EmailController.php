<?php

namespace App\Http\Controllers\Communications;

use App\Http\Controllers\Controller;
use App\Jobs\SendBulkEmail;
use App\Models\EmailCampaign;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    use ApiResponse;

    public function send(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'            => 'required|string',
            'subject'         => 'required|string',
            'body'            => 'required|string',
            'from_name'       => 'nullable|string',
            'from_email'      => 'nullable|email',
            'segment_filters' => 'nullable|array',
            'scheduled_at'    => 'nullable|date|after:now',
        ]);

        $emailCampaign = EmailCampaign::create(array_merge($data, ['status' => 'draft']));

        $query = Voter::whereNotNull('email')->where('do_not_contact', false);
        if (!empty($data['segment_filters']['constituency'])) {
            $query->where('constituency', $data['segment_filters']['constituency']);
        }
        if (!empty($data['segment_filters']['sentiment'])) {
            $query->where('sentiment', $data['segment_filters']['sentiment']);
        }

        $recipients = $query->pluck('email')->toArray();
        $emailCampaign->update(['recipient_count' => count($recipients)]);

        if ($request->filled('scheduled_at')) {
            $emailCampaign->update(['status' => 'scheduled', 'scheduled_at' => $data['scheduled_at']]);
        } else {
            dispatch(new SendBulkEmail($emailCampaign->id, $recipients));
            $emailCampaign->update(['status' => 'sending']);
        }

        return $this->success($emailCampaign, 'Email campaign queued', 201);
    }

    public function campaigns(): JsonResponse
    {
        $campaigns = EmailCampaign::orderBy('created_at', 'desc')->paginate(20);
        return $this->paginate($campaigns);
    }
}
