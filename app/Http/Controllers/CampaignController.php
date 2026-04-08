<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->success(Campaign::withCount(['canvassingLists', 'runners'])->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'          => 'required|string|max:255',
            'type'          => 'required|in:general_election,by_election,canvassing,gotv,awareness',
            'status'        => 'nullable|in:draft,active,paused,completed',
            'description'   => 'nullable|string',
            'start_date'    => 'nullable|date',
            'end_date'      => 'nullable|date|after:start_date',
            'turnout_goal'  => 'nullable|integer|min:0',
        ]);

        $campaign = Campaign::create($data);
        return $this->success($campaign, 'Campaign created', 201);
    }

    public function show(int $id): JsonResponse
    {
        $campaign = Campaign::withCount(['canvassingLists', 'runners'])
            ->with(['canvassingLists.canvasser'])
            ->findOrFail($id);
        return $this->success($campaign);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $campaign = Campaign::findOrFail($id);
        $campaign->update($request->all());
        return $this->success($campaign, 'Campaign updated');
    }

    public function destroy(int $id): JsonResponse
    {
        Campaign::findOrFail($id)->delete();
        return $this->success(null, 'Campaign deleted');
    }
}
