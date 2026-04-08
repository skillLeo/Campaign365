<?php

namespace App\Http\Controllers\Field;

use App\Http\Controllers\Controller;
use App\Models\CanvassingList;
use App\Models\DoorKnock;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CanvasserController extends Controller
{
    use ApiResponse;

    public function lists(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = CanvassingList::with(['campaign', 'canvasser:id,name']);

        if (!$user->hasAnyRole(['campaign_manager', 'general_secretary', 'region_manager'])) {
            $query->where('canvasser_id', $user->id);
        }

        return $this->success($query->get());
    }

    public function createList(Request $request): JsonResponse
    {
        $data = $request->validate([
            'campaign_id'   => 'required|exists:campaigns,id',
            'canvasser_id'  => 'required|exists:users,id',
            'name'          => 'required|string',
            'area_name'     => 'nullable|string',
            'turf_geojson'  => 'nullable|array',
            'walk_date'     => 'nullable|date',
            'voter_ids'     => 'nullable|array',
        ]);

        $list = CanvassingList::create($data);

        if (!empty($data['voter_ids'])) {
            $list->update(['total_voters' => count($data['voter_ids'])]);
        }

        return $this->success($list, 'Canvassing list created', 201);
    }

    public function showList(int $id): JsonResponse
    {
        $list = CanvassingList::with(['campaign', 'canvasser', 'doorKnocks.voter'])->findOrFail($id);
        return $this->success($list);
    }

    public function activateList(int $id): JsonResponse
    {
        $list = CanvassingList::findOrFail($id);
        $list->update(['status' => 'active', 'activated_at' => now()]);
        return $this->success($list, 'List activated');
    }

    public function downloadOffline(int $id): JsonResponse
    {
        $list = CanvassingList::with(['doorKnocks', 'campaign'])->findOrFail($id);

        $voterIds = DoorKnock::where('canvassing_list_id', $id)->pluck('voter_id');
        $voters = Voter::whereIn('id', $voterIds)->get();

        return $this->success([
            'list'   => $list,
            'voters' => $voters,
        ], 'Offline data ready');
    }

    public function recordDoorKnock(Request $request): JsonResponse
    {
        $data = $request->validate([
            'canvassing_list_id' => 'required|exists:canvassing_lists,id',
            'voter_id'           => 'required|exists:voters,id',
            'result'             => 'required|in:answered,not_home,refused,moved,deceased,callback',
            'sentiment'          => 'nullable|in:supporter,undecided,opposition,unknown',
            'notes'              => 'nullable|string',
            'transcription'      => 'nullable|string',
            'latitude'           => 'nullable|numeric',
            'longitude'          => 'nullable|numeric',
            'knocked_at'         => 'nullable|date',
        ]);

        $data['canvasser_id'] = $request->user()->id;
        $data['knocked_at'] = $data['knocked_at'] ?? now();
        $data['synced'] = true;

        $doorKnock = DoorKnock::create($data);

        // Update voter sentiment if provided
        if (!empty($data['sentiment'])) {
            Voter::find($data['voter_id'])->update([
                'sentiment'         => $data['sentiment'],
                'last_contacted_at' => now(),
            ]);
        }

        // Update visited count
        $list = CanvassingList::find($data['canvassing_list_id']);
        $list->increment('visited_count');

        return $this->success($doorKnock, 'Door knock recorded', 201);
    }

    public function syncOfflineData(Request $request): JsonResponse
    {
        $request->validate([
            'records' => 'required|array',
        ]);

        $results = ['imported' => 0, 'failed' => 0, 'errors' => []];

        foreach ($request->records as $record) {
            try {
                $record['canvasser_id'] = $request->user()->id;
                $record['synced'] = true;
                DoorKnock::create($record);
                $results['imported']++;
            } catch (\Exception $e) {
                $results['failed']++;
                $results['errors'][] = $e->getMessage();
            }
        }

        return $this->success($results, 'Sync completed');
    }
}
