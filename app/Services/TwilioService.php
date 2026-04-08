<?php

namespace App\Services;

use Twilio\Rest\Client;

class TwilioService
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client(
            config('services.twilio.sid'),
            config('services.twilio.token')
        );
    }

    public function sendSMS(string $to, string $message): void
    {
        $this->client->messages->create($to, [
            'from' => config('services.twilio.from'),
            'body' => $message,
        ]);
    }

    public function sendWhatsApp(string $to, string $message): void
    {
        $this->client->messages->create("whatsapp:{$to}", [
            'from' => config('services.twilio.whatsapp_from'),
            'body' => $message,
        ]);
    }
}
