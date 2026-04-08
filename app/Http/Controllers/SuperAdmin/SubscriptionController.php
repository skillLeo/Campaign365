<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    use ApiResponse;

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'plan'         => 'required|in:essentials,professional,enterprise,sovereign',
            'custom_price' => 'nullable|numeric|min:0',
        ]);

        $tenant = Tenant::findOrFail($id);
        $tenant->update($data);
        return $this->success($tenant, 'Subscription updated');
    }

    public function updateFeatures(Request $request, int $id): JsonResponse
    {
        $request->validate(['feature_flags' => 'required|array']);

        $tenant = Tenant::findOrFail($id);
        $tenant->update(['feature_flags' => $request->feature_flags]);
        return $this->success($tenant, 'Feature flags updated');
    }
}
