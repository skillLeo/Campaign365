<?php

namespace App\Models;

class ComplianceReport extends BaseModel
{
    protected $fillable = [
        'tenant_id', 'jurisdiction', 'report_type', 'report_data',
        'status', 'generated_at', 'submitted_at',
    ];

    protected $casts = [
        'report_data'  => 'array',
        'generated_at' => 'datetime',
        'submitted_at' => 'datetime',
    ];
}
