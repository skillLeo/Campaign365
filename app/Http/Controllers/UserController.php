<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use ApiResponse;

    /**
     * List all users belonging to the current tenant.
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::with('roles');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->has('role')) {
            $query->whereHas('roles', fn($q) => $q->where('name', $request->role));
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $perPage = min($request->get('per_page', 20), 100);
        return $this->paginate($query->paginate($perPage));
    }

    /**
     * Create a new team member for the current tenant.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'phone'   => 'nullable|string|max:20',
            'role'    => 'required|string|exists:roles,name',
            'password'=> 'nullable|string|min:8',
        ]);

        $tenant = app('current_tenant');

        // Check email uniqueness within this tenant
        $exists = User::withoutGlobalScopes()
            ->where('tenant_id', $tenant->id)
            ->where('email', $data['email'])
            ->exists();

        if ($exists) {
            return $this->error('A user with this email already exists in your team.', 422);
        }

        $tempPassword = $data['password'] ?? Str::random(12);

        $user = User::withoutGlobalScopes()->create([
            'tenant_id' => $tenant->id,
            'name'      => $data['name'],
            'email'     => $data['email'],
            'phone'     => $data['phone'] ?? null,
            'password'  => Hash::make($tempPassword),
            'status'    => 'active',
        ]);

        $user->assignRole($data['role']);

        return $this->success([
            'user'          => $user->load('roles'),
            'temp_password' => empty($data['password']) ? $tempPassword : null,
        ], 'Team member created', 201);
    }

    /**
     * Get a single user by ID.
     */
    public function show(int $id): JsonResponse
    {
        $user = User::with(['roles', 'permissions'])->findOrFail($id);
        return $this->success($user);
    }

    /**
     * Update user details or role.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name'   => 'nullable|string|max:255',
            'phone'  => 'nullable|string|max:20',
            'status' => 'nullable|in:active,inactive,suspended',
            'role'   => 'nullable|string|exists:roles,name',
        ]);

        if (!empty($data['name']))   $user->name   = $data['name'];
        if (!empty($data['phone']))  $user->phone  = $data['phone'];
        if (!empty($data['status'])) $user->status = $data['status'];

        $user->save();

        if (!empty($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $this->success($user->load('roles'), 'User updated');
    }

    /**
     * Reset a team member's password (generates new temp password).
     */
    public function resetPassword(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $request->validate(['password' => 'nullable|string|min:8']);

        $tempPassword = $request->password ?? Str::random(12);
        $user->update(['password' => Hash::make($tempPassword)]);

        return $this->success([
            'temp_password' => empty($request->password) ? $tempPassword : null,
        ], 'Password reset successfully');
    }

    /**
     * Soft-delete (deactivate) a team member.
     */
    public function destroy(int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        // Cannot delete yourself
        if ($user->id === auth()->id()) {
            return $this->error('You cannot delete your own account', 422);
        }

        $user->update(['status' => 'inactive']);
        $user->tokens()->delete();
        $user->delete();

        return $this->success(null, 'Team member removed');
    }

    /**
     * List all available roles (for frontend role picker).
     */
    public function roles(): JsonResponse
    {
        $roles = Role::all(['id', 'name'])->map(fn($r) => [
            'value' => $r->name,
            'label' => str_replace('_', ' ', ucfirst($r->name)),
        ]);

        return $this->success($roles);
    }

    /**
     * Update the authenticated user's own profile.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'name'             => 'nullable|string|max:255',
            'phone'            => 'nullable|string|max:20',
            'avatar_url'       => 'nullable|url',
            'current_password' => 'nullable|string',
            'new_password'     => 'nullable|string|min:8|confirmed',
        ]);

        if (!empty($data['new_password'])) {
            if (empty($data['current_password']) || !Hash::check($data['current_password'], $user->password)) {
                return $this->error('Current password is incorrect', 422);
            }
            $user->password = Hash::make($data['new_password']);
        }

        if (!empty($data['name']))       $user->name       = $data['name'];
        if (!empty($data['phone']))      $user->phone      = $data['phone'];
        if (!empty($data['avatar_url'])) $user->avatar_url = $data['avatar_url'];

        $user->save();

        return $this->success($user->load('roles'), 'Profile updated');
    }
}
