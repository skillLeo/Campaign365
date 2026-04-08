<?php

namespace App\Http\Controllers\Fundraising;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->success(Event::orderBy('starts_at')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'       => 'required|string',
            'description' => 'nullable|string',
            'location'    => 'nullable|string',
            'latitude'    => 'nullable|numeric',
            'longitude'   => 'nullable|numeric',
            'starts_at'   => 'required|date',
            'ends_at'     => 'nullable|date|after:starts_at',
            'capacity'    => 'nullable|integer|min:1',
            'status'      => 'nullable|in:upcoming,active,completed,cancelled',
        ]);

        $event = Event::create($data);
        return $this->success($event, 'Event created', 201);
    }

    public function show(int $id): JsonResponse
    {
        return $this->success(Event::findOrFail($id));
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        return $this->success($event, 'Event updated');
    }

    public function destroy(int $id): JsonResponse
    {
        Event::findOrFail($id)->delete();
        return $this->success(null, 'Event deleted');
    }
}
