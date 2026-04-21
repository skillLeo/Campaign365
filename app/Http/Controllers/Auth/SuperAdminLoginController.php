<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SuperAdmin;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SuperAdminLoginController extends Controller
{
    use ApiResponse;

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $admin = SuperAdmin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return $this->error('Invalid credentials', 401);
        }

        $admin->update(['last_login_at' => now()]);
        $token = $admin->createToken('super-admin-token', ['super_admin'])->plainTextToken;

        return $this->success([
            'admin' => $admin,
            'token' => $token,
        ], 'Login successful');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user('super_admin_sanctum')->currentAccessToken()->delete();
        return $this->success(null, 'Logged out successfully');
    }

    public function me(Request $request): JsonResponse
    {
        return $this->success($request->user('super_admin_sanctum'));
    }
}
