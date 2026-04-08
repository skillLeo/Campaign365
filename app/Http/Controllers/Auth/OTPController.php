<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OTPController extends Controller
{
    use ApiResponse;

    public function verify(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|string',
        ]);

        $user = User::withoutGlobalScopes()->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->otp, $user->otp)) {
            return $this->error('Invalid OTP', 422);
        }

        if ($user->otp_expires_at < now()) {
            return $this->error('OTP has expired', 422);
        }

        return $this->success(['verified' => true], 'OTP verified');
    }
}
