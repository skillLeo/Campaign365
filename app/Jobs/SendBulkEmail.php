<?php

namespace App\Jobs;

use App\Models\EmailCampaign;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendBulkEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 3;
    public int $backoff = 120;

    public function __construct(
        private int $emailCampaignId,
        private array $recipients
    ) {}

    public function handle(): void
    {
        $campaign = EmailCampaign::find($this->emailCampaignId);
        if (!$campaign) return;

        $sent = 0;

        foreach (array_chunk($this->recipients, 100) as $chunk) {
            foreach ($chunk as $email) {
                try {
                    Mail::html($campaign->body, function ($msg) use ($campaign, $email) {
                        $msg->to($email)
                            ->subject($campaign->subject)
                            ->from(
                                $campaign->from_email ?? config('mail.from.address'),
                                $campaign->from_name ?? config('mail.from.name')
                            );
                    });
                    $sent++;
                    usleep(50000);
                } catch (\Exception $e) {
                    \Log::error("Email failed to {$email}: " . $e->getMessage());
                }
            }
        }

        $campaign->update([
            'status'           => 'sent',
            'sent_at'          => now(),
            'recipient_count'  => $sent,
        ]);
    }
}
