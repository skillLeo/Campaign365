<?php

namespace App\Http\Controllers\Voter;

use App\Http\Controllers\Controller;
use App\Models\Voter;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as ResponseFacade;

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

        if ($request->has('age_min')) {
            $query->where('age', '>=', (int) $request->age_min);
        }

        if ($request->has('age_max')) {
            $query->where('age', '<=', (int) $request->age_max);
        }

        if ($request->boolean('do_not_contact')) {
            $query->where('do_not_contact', true);
        }

        if ($request->has('tag')) {
            $query->whereJsonContains('custom_tags', $request->tag);
        }

        $perPage = min($request->get('per_page', 20), 100);
        $voters  = $query->paginate($perPage);

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
            'custom_tags'      => 'nullable|array',
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

        $data = $request->validate([
            'first_name'          => 'nullable|string|max:255',
            'last_name'           => 'nullable|string|max:255',
            'address'             => 'nullable|string',
            'constituency'        => 'nullable|string',
            'polling_division'    => 'nullable|string',
            'phone'               => 'nullable|string',
            'email'               => 'nullable|email',
            'age'                 => 'nullable|integer|min:18',
            'gender'              => 'nullable|in:male,female,other',
            'sentiment'           => 'nullable|in:supporter,undecided,opposition,unknown',
            'do_not_contact'      => 'nullable|boolean',
            'preferred_language'  => 'nullable|string|size:2',
            'custom_tags'         => 'nullable|array',
        ]);

        $voter->update($data);
        return $this->success($voter, 'Voter updated');
    }

    public function destroy(int $id): JsonResponse
    {
        Voter::findOrFail($id)->delete();
        return $this->success(null, 'Voter deleted');
    }

    /**
     * Bulk update the sentiment/tags for multiple voters at once.
     */
    public function bulkUpdate(Request $request): JsonResponse
    {
        $request->validate([
            'voter_ids'  => 'required|array|min:1',
            'voter_ids.*'=> 'integer',
            'sentiment'  => 'nullable|in:supporter,undecided,opposition,unknown',
            'tag'        => 'nullable|string|max:50',
            'remove_tag' => 'nullable|string|max:50',
            'do_not_contact' => 'nullable|boolean',
        ]);

        $voterIds = $request->voter_ids;
        $updated  = 0;

        $voters = Voter::whereIn('id', $voterIds)->get();

        foreach ($voters as $voter) {
            $changes = [];

            if ($request->filled('sentiment')) {
                $changes['sentiment'] = $request->sentiment;
            }

            if ($request->has('do_not_contact')) {
                $changes['do_not_contact'] = $request->boolean('do_not_contact');
            }

            if (!empty($changes)) {
                $voter->fill($changes);
            }

            // Handle tag addition
            if ($request->filled('tag')) {
                $tags = $voter->custom_tags ?? [];
                if (!in_array($request->tag, $tags)) {
                    $tags[] = $request->tag;
                    $voter->custom_tags = $tags;
                }
            }

            // Handle tag removal
            if ($request->filled('remove_tag')) {
                $tags = $voter->custom_tags ?? [];
                $voter->custom_tags = array_values(array_filter($tags, fn($t) => $t !== $request->remove_tag));
            }

            $voter->save();
            $updated++;
        }

        return $this->success([
            'updated' => $updated,
            'total'   => count($voterIds),
        ], "{$updated} voters updated");
    }

    /**
     * Export voters as CSV.
     * Applies same filters as index for selective exports.
     */
    public function export(Request $request): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $query = Voter::query();

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
        if ($request->has('tag')) {
            $query->whereJsonContains('custom_tags', $request->tag);
        }

        $fileName = 'voters_export_' . now()->format('Ymd_His') . '.csv';

        return ResponseFacade::streamDownload(function () use ($query) {
            $handle = fopen('php://output', 'w');

            // BOM for Excel UTF-8 compatibility
            fputs($handle, "\xEF\xBB\xBF");

            fputcsv($handle, [
                'ID', 'First Name', 'Last Name', 'Address', 'Constituency',
                'Polling Division', 'Parish', 'Phone', 'Email', 'Age', 'Gender',
                'Sentiment', 'Sentiment Score', 'Turnout Probability',
                'Do Not Contact', 'Last Contacted', 'Tags',
            ]);

            $query->chunk(500, function ($voters) use ($handle) {
                foreach ($voters as $v) {
                    fputcsv($handle, [
                        $v->id,
                        $v->first_name,
                        $v->last_name,
                        $v->address,
                        $v->constituency,
                        $v->polling_division,
                        $v->parish,
                        $v->phone,
                        $v->email,
                        $v->age,
                        $v->gender,
                        $v->sentiment,
                        $v->sentiment_score,
                        $v->turnout_probability,
                        $v->do_not_contact ? 'Yes' : 'No',
                        $v->last_contacted_at?->format('Y-m-d H:i'),
                        implode(', ', $v->custom_tags ?? []),
                    ]);
                }
            });

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    /**
     * Get aggregated statistics for the voter database.
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total'            => Voter::count(),
            'by_sentiment'     => [
                'supporter'  => Voter::where('sentiment', 'supporter')->count(),
                'undecided'  => Voter::where('sentiment', 'undecided')->count(),
                'opposition' => Voter::where('sentiment', 'opposition')->count(),
                'unknown'    => Voter::where('sentiment', 'unknown')->count(),
            ],
            'by_gender'        => [
                'male'   => Voter::where('gender', 'male')->count(),
                'female' => Voter::where('gender', 'female')->count(),
                'other'  => Voter::where('gender', 'other')->count(),
            ],
            'do_not_contact'   => Voter::where('do_not_contact', true)->count(),
            'contacted'        => Voter::whereNotNull('last_contacted_at')->count(),
            'constituencies'   => Voter::selectRaw('constituency, count(*) as count')
                                       ->whereNotNull('constituency')
                                       ->groupBy('constituency')
                                       ->orderBy('count', 'desc')
                                       ->get(),
        ];

        return $this->success($stats);
    }
}
