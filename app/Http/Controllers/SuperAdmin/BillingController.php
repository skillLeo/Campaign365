<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class BillingController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $planPrices = [
            'essentials'   => 500,
            'professional' => 1500,
            'enterprise'   => 2500,
            'sovereign'    => 0,
        ];

        $tenants = Tenant::where('status', 'active')->get();

        $totalMRR = $tenants->sum(function ($tenant) use ($planPrices) {
            return $tenant->custom_price ?? ($planPrices[$tenant->plan] ?? 0);
        });

        return $this->success([
            'total_mrr'    => $totalMRR,
            'total_active' => $tenants->count(),
            'billing_list' => $tenants->map(fn($t) => [
                'id'          => $t->id,
                'name'        => $t->name,
                'plan'        => $t->plan,
                'amount'      => $t->custom_price ?? ($planPrices[$t->plan] ?? 0),
                'status'      => 'active',
                'billing_email' => $t->billing_email,
            ]),
        ]);
    }
}
