<?php

namespace App\Http\Controllers\Communications;

use App\Http\Controllers\Controller;
use App\Jobs\SendBulkWhatsApp;
use App\Models\SmsCampaign;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WhatsAppController extends Controller
{
    use ApiResponse;

    public function send(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'            => 'required|string',
            'message'         => 'required|string|max:1600',
            'segment_filters' => 'nullable|array',
        ]);

        $campaign = SmsCampaign::create(array_merge($data, [
            'channel' => 'whatsapp',
            'status'  => 'sending',
        ]));

        $phones = Voter::whereNotNull('phone')
            ->where('do_not_contact', false)
            ->pluck('phone')
            ->toArray();

        $campaign->update(['recipient_count' => count($phones)]);

        dispatch(new SendBulkWhatsApp($phones, $data['message'], $campaign->id));

        return $this->success($campaign, 'WhatsApp campaign queued', 201);
    }
}
