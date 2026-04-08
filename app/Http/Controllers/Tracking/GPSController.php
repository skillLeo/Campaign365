<?php

namespace App\Http\Controllers\Tracking;

use App\Http\Controllers\Controller;
use App\Services\GPSTrackingService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GPSController extends Controller
{
    use ApiResponse;

    public function __construct(private GPSTrackingService $gpsService) {}

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'latitude'  => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'accuracy'  => 'nullable|numeric',
            'speed'     => 'nullable|numeric',
        ]);

        $log = $this->gpsService->updateLocation(
            $request->user(),
            $request->latitude,
            $request->longitude,
            $request->accuracy
        );

        return $this->success($log, 'Location updated');
    }

    public function live(): JsonResponse
    {
        $locations = $this->gpsService->getLiveLocations();
        return $this->success($locations);
    }
}
