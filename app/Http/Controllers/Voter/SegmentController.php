<?php

namespace App\Http\Controllers\Voter;

use App\Http\Controllers\Controller;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SegmentController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->success([
            ['id' => 1, 'name' => 'All Supporters', 'filters' => ['sentiment' => 'supporter'], 'count' => Voter::where('sentiment', 'supporter')->count()],
            ['id' => 2, 'name' => 'Undecided Voters', 'filters' => ['sentiment' => 'undecided'], 'count' => Voter::where('sentiment', 'undecided')->count()],
            ['id' => 3, 'name' => 'All Voters', 'filters' => [], 'count' => Voter::count()],
        ]);
    }

    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'name'    => 'required|string',
            'filters' => 'required|array',
        ]);

        $query = Voter::query();
        $filters = $request->filters;

        if (!empty($filters['sentiment'])) {
            $query->where('sentiment', $filters['sentiment']);
        }
        if (!empty($filters['constituency'])) {
            $query->where('constituency', $filters['constituency']);
        }
        if (!empty($filters['age_min'])) {
            $query->where('age', '>=', $filters['age_min']);
        }
        if (!empty($filters['age_max'])) {
            $query->where('age', '<=', $filters['age_max']);
        }
        if (!empty($filters['gender'])) {
            $query->where('gender', $filters['gender']);
        }

        $count = $query->count();

        return $this->success([
            'name'    => $request->name,
            'filters' => $filters,
            'count'   => $count,
        ], 'Segment created', 201);
    }
}
