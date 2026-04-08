<?php

namespace App\Jobs;

use App\Models\SmsCampaign;
use App\Services\TwilioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendBulkWhatsApp implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 3;
    public int $backoff = 60;

    public function __construct(
        private array $phoneNumbers,
        private string $message,
        private ?int $campaignId = null
    ) {}

    public function handle(TwilioService $twilio): void
    {
        $delivered = 0;
        $failed    = 0;

        foreach ($this->phoneNumbers as $phone) {
            try {
                $twilio->sendWhatsApp($phone, $this->message);
                $delivered++;
                usleep(200000);
            } catch (\Exception $e) {
                $failed++;
                \Log::error("WhatsApp failed to {$phone}: " . $e->getMessage());
            }
        }

        if ($this->campaignId) {
            SmsCampaign::find($this->campaignId)?->update([
                'status'          => 'sent',
                'sent_at'         => now(),
                'delivered_count' => $delivered,
                'failed_count'    => $failed,
            ]);
        }
    }
}
