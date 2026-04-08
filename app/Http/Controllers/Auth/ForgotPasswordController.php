<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    use ApiResponse;

    public function send(Request $request): JsonResponse
    {
        $request->validate(['email' => 'required|email']);

        $user = User::withoutGlobalScopes()->where('email', $request->email)->first();

        if (!$user) {
            return $this->success(null, 'If this email exists, a reset OTP has been sent.');
        }

        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $user->update([
            'otp'            => Hash::make($otp),
            'otp_expires_at' => now()->addMinutes(15),
        ]);

        // TODO: Send email with OTP
        \Log::info("Password reset OTP for {$user->email}: {$otp}");

        return $this->success(null, 'If this email exists, a reset OTP has been sent.');
    }

    public function reset(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'otp'      => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::withoutGlobalScopes()->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->otp, $user->otp)) {
            return $this->error('Invalid or expired OTP', 422);
        }

        if ($user->otp_expires_at < now()) {
            return $this->error('OTP has expired', 422);
        }

        $user->update([
            'password'       => Hash::make($request->password),
            'otp'            => null,
            'otp_expires_at' => null,
        ]);

        return $this->success(null, 'Password reset successfully');
    }
}
