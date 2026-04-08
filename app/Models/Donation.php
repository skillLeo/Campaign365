<?php

namespace App\Models;

class Donation extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'donor_name', 'donor_email', 'donor_phone',
        'amount', 'currency', 'payment_gateway', 'transaction_id',
        'status', 'type', 'is_anonymous', 'notes', 'donated_at',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
        'donated_at'   => 'datetime',
    ];
}
