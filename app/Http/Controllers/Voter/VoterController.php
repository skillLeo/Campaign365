<?php

namespace App\Http\Controllers\Voter;

use App\Http\Controllers\Controller;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VoterController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = Voter::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('constituency')) {
            $query->where('constituency', $request->constituency);
        }

        if ($request->has('sentiment')) {
            $query->where('sentiment', $request->sentiment);
        }

        if ($request->has('polling_division')) {
            $query->where('polling_division', $request->polling_division);
        }

        if ($request->has('gender')) {
            $query->where('gender', $request->gender);
        }

        $perPage = min($request->get('per_page', 20), 100);
        $voters = $query->paginate($perPage);

        return $this->paginate($voters);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'first_name'       => 'required|string|max:255',
            'last_name'        => 'required|string|max:255',
            'address'          => 'required|string',
            'constituency'     => 'nullable|string',
            'polling_division' => 'nullable|string',
            'parish'           => 'nullable|string',
            'phone'            => 'nullable|string',
            'email'            => 'nullable|email',
            'age'              => 'nullable|integer|min:18',
            'gender'           => 'nullable|in:male,female,other',
            'sentiment'        => 'nullable|in:supporter,undecided,opposition,unknown',
        ]);

        $voter = Voter::create($data);
        return $this->success($voter, 'Voter created', 201);
    }

    public function show(int $id): JsonResponse
    {
        $voter = Voter::with(['doorKnocks.canvasser'])->findOrFail($id);
        return $this->success($voter);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $voter = Voter::findOrFail($id);
        $voter->update($request->all());
        return $this->success($voter, 'Voter updated');
    }

    public function destroy(int $id): JsonResponse
    {
        Voter::findOrFail($id)->delete();
        return $this->success(null, 'Voter deleted');
    }
}
