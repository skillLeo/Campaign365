<?php

namespace App\Http\Controllers\Field;

use App\Http\Controllers\Controller;
use App\Models\CanvassingList;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TurfController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        $turfs = CanvassingList::with(['canvasser:id,name', 'campaign:id,name'])
            ->whereNotNull('turf_geojson')
            ->get();
        return $this->success($turfs);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'campaign_id'  => 'required|exists:campaigns,id',
            'name'         => 'required|string',
            'area_name'    => 'nullable|string',
            'turf_geojson' => 'required|array',
            'walk_date'    => 'nullable|date',
        ]);

        $list = CanvassingList::create(array_merge($data, [
            'canvasser_id' => auth()->id(),
            'status'       => 'pending',
        ]));

        return $this->success($list, 'Turf created', 201);
    }

    public function assign(Request $request, int $id): JsonResponse
    {
        $request->validate(['canvasser_id' => 'required|exists:users,id']);

        $list = CanvassingList::findOrFail($id);
        $list->update(['canvasser_id' => $request->canvasser_id]);

        return $this->success($list, 'Turf assigned');
    }

    public function generateWalkList(int $id): JsonResponse
    {
        $list = CanvassingList::with(['doorKnocks.voter'])->findOrFail($id);

        $voters = Voter::orderBy('address')->limit(200)->get([
            'id', 'first_name', 'last_name', 'address',
            'constituency', 'polling_division', 'sentiment', 'phone',
        ]);

        return $this->success([
            'list'   => $list,
            'voters' => $voters,
        ]);
    }
}
