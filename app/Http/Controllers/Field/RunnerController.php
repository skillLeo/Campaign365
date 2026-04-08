<?php

namespace App\Http\Controllers\Field;

use App\Http\Controllers\Controller;
use App\Models\GpsLog;
use App\Models\PickupAssignment;
use App\Models\Runner;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RunnerController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->success(Runner::with(['user:id,name,phone', 'campaign:id,name'])->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'user_id'       => 'required|exists:users,id',
            'campaign_id'   => 'required|exists:campaigns,id',
            'vehicle_type'  => 'nullable|string',
            'vehicle_plate' => 'nullable|string',
            'capacity'      => 'nullable|integer|min:1|max:20',
        ]);

        $runner = Runner::create($data);
        return $this->success($runner, 'Runner registered', 201);
    }

    public function assign(Request $request): JsonResponse
    {
        $data = $request->validate([
            'runner_id'           => 'required|exists:runners,id',
            'voter_id'            => 'required|exists:voters,id',
            'scheduled_time'      => 'required|date',
            'pickup_address'      => 'required|string',
            'destination_address' => 'required|string',
            'passenger_count'     => 'nullable|integer|min:1',
        ]);

        $assignment = PickupAssignment::create($data);
        return $this->success($assignment, 'Pickup assigned', 201);
    }

    public function location(int $id): JsonResponse
    {
        $runner = Runner::with('user')->findOrFail($id);

        $lastLocation = GpsLog::where('user_id', $runner->user_id)
            ->orderBy('logged_at', 'desc')
            ->first();

        return $this->success([
            'runner'   => $runner,
            'location' => $lastLocation,
        ]);
    }

    public function updatePickupStatus(Request $request, int $id): JsonResponse
    {
        $request->validate(['pickup_status' => 'required|in:pending,en_route,arrived,picked_up,delivered,missed']);

        $assignment = PickupAssignment::findOrFail($id);
        $assignment->update([
            'pickup_status' => $request->pickup_status,
            'completed_at'  => in_array($request->pickup_status, ['delivered', 'missed']) ? now() : null,
        ]);

        return $this->success($assignment, 'Pickup status updated');
    }
}
