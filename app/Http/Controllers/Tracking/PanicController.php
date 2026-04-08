<?php

namespace App\Http\Controllers\Tracking;

use App\Http\Controllers\Controller;
use App\Models\PanicAlert;
use App\Services\PanicButtonService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PanicController extends Controller
{
    use ApiResponse;

    public function __construct(private PanicButtonService $panicService) {}

    public function trigger(Request $request): JsonResponse
    {
        $request->validate([
            'latitude'  => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $alert = $this->panicService->trigger(
            $request->user(),
            $request->latitude,
            $request->longitude
        );

        return $this->success($alert, 'Panic alert triggered', 201);
    }

    public function resolve(Request $request, int $id): JsonResponse
    {
        $alert = PanicAlert::findOrFail($id);
        $alert->update([
            'status'           => 'resolved',
            'resolved_by'      => $request->user()->id,
            'resolved_at'      => now(),
            'resolution_notes' => $request->resolution_notes,
        ]);

        return $this->success($alert, 'Alert resolved');
    }

    public function active(): JsonResponse
    {
        $alerts = PanicAlert::with('user:id,name,phone,avatar_url')
            ->where('status', 'active')
            ->orderBy('triggered_at', 'desc')
            ->get();

        return $this->success($alerts);
    }
}
