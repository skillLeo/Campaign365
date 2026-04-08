<?php

namespace App\Http\Controllers\Fundraising;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $donations = Donation::orderBy('donated_at', 'desc')->paginate(20);
        return $this->paginate($donations);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'donor_name'      => 'required|string',
            'donor_email'     => 'nullable|email',
            'donor_phone'     => 'nullable|string',
            'amount'          => 'required|numeric|min:1',
            'currency'        => 'nullable|string|size:3',
            'payment_gateway' => 'required|in:powertranz,wipay,stripe,cash,cheque',
            'transaction_id'  => 'nullable|string',
            'type'            => 'nullable|in:one_time,recurring',
            'is_anonymous'    => 'nullable|boolean',
            'notes'           => 'nullable|string',
        ]);

        $data['donated_at'] = now();
        $data['status'] = 'completed';

        $donation = Donation::create($data);
        return $this->success($donation, 'Donation recorded', 201);
    }

    public function donors(): JsonResponse
    {
        $donors = Donation::selectRaw('donor_name, donor_email, SUM(amount) as total, COUNT(*) as count')
            ->where('status', 'completed')
            ->groupBy('donor_name', 'donor_email')
            ->orderBy('total', 'desc')
            ->get();

        return $this->success($donors);
    }

    public function stats(): JsonResponse
    {
        $stats = [
            'total_raised'    => Donation::where('status', 'completed')->sum('amount'),
            'total_donors'    => Donation::where('status', 'completed')->distinct('donor_email')->count(),
            'this_month'      => Donation::where('status', 'completed')->whereMonth('donated_at', now()->month)->sum('amount'),
            'by_gateway'      => Donation::where('status', 'completed')->selectRaw('payment_gateway, SUM(amount) as total')->groupBy('payment_gateway')->get(),
            'top_donors'      => Donation::selectRaw('donor_name, SUM(amount) as total')->where('is_anonymous', false)->groupBy('donor_name')->orderBy('total', 'desc')->limit(10)->get(),
        ];

        return $this->success($stats);
    }
}
