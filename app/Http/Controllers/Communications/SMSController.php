<?php

namespace App\Http\Controllers\Communications;

use App\Http\Controllers\Controller;
use App\Jobs\SendBulkSMS;
use App\Models\SmsCampaign;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SMSController extends Controller
{
    use ApiResponse;

    public function send(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'            => 'required|string',
            'message'         => 'required|string|max:1600',
            'segment_filters' => 'nullable|array',
            'scheduled_at'    => 'nullable|date|after:now',
        ]);

        $smsCampaign = SmsCampaign::create(array_merge($data, [
            'channel' => 'sms',
            'status'  => 'draft',
        ]));

        $query = Voter::whereNotNull('phone')->where('do_not_contact', false);
        if (!empty($data['segment_filters']['sentiment'])) {
            $query->where('sentiment', $data['segment_filters']['sentiment']);
        }
        if (!empty($data['segment_filters']['constituency'])) {
            $query->where('constituency', $data['segment_filters']['constituency']);
        }

        $phones = $query->pluck('phone')->toArray();
        $smsCampaign->update(['recipient_count' => count($phones)]);

        if ($request->filled('scheduled_at')) {
            $smsCampaign->update(['status' => 'scheduled', 'scheduled_at' => $data['scheduled_at']]);
        } else {
            dispatch(new SendBulkSMS($phones, $data['message'], $smsCampaign->id));
            $smsCampaign->update(['status' => 'sending']);
        }

        return $this->success($smsCampaign, 'SMS campaign queued', 201);
    }

    public function campaigns(): JsonResponse
    {
        return $this->success(SmsCampaign::where('channel', 'sms')->orderBy('created_at', 'desc')->get());
    }
}
