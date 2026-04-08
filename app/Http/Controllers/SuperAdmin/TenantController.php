<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Tenant;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TenantController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = Tenant::withCount(['users', 'voters', 'campaigns']);

        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('subdomain', 'like', "%{$request->search}%");
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('plan')) {
            $query->where('plan', $request->plan);
        }

        return $this->paginate($query->paginate(20));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'          => 'required|string|max:255',
            'subdomain'     => 'required|string|alpha_dash|unique:tenants|max:50',
            'plan'          => 'required|in:essentials,professional,enterprise,sovereign',
            'country'       => 'nullable|string',
            'jurisdiction'  => 'nullable|string',
            'billing_email' => 'nullable|email',
            'primary_color' => 'nullable|string',
            'logo_url'      => 'nullable|url',
            // Admin account for new tenant
            'admin_name'    => 'required|string',
            'admin_email'   => 'required|email',
        ]);

        $tenant = Tenant::create([
            'name'          => $data['name'],
            'subdomain'     => $data['subdomain'],
            'plan'          => $data['plan'],
            'country'       => $data['country'] ?? null,
            'jurisdiction'  => $data['jurisdiction'] ?? null,
            'billing_email' => $data['billing_email'] ?? $data['admin_email'],
            'primary_color' => $data['primary_color'] ?? '#14B7A6',
            'logo_url'      => $data['logo_url'] ?? null,
            'status'        => 'active',
        ]);

        $tempPassword = Str::random(12);
        $user = User::withoutGlobalScopes()->create([
            'tenant_id' => $tenant->id,
            'name'      => $data['admin_name'],
            'email'     => $data['admin_email'],
            'password'  => Hash::make($tempPassword),
            'status'    => 'active',
        ]);
        $user->assignRole('general_secretary');

        AuditLog::record('tenant.created', $tenant, [], $tenant->toArray());

        return $this->success([
            'tenant'    => $tenant,
            'admin'     => $user,
            'temp_password' => $tempPassword,
        ], 'Tenant created successfully', 201);
    }

    public function show(int $id): JsonResponse
    {
        $tenant = Tenant::withCount(['users', 'voters', 'campaigns'])->findOrFail($id);
        return $this->success($tenant);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $tenant = Tenant::findOrFail($id);
        $old = $tenant->toArray();
        $tenant->update($request->all());
        AuditLog::record('tenant.updated', $tenant, $old, $tenant->fresh()->toArray());
        return $this->success($tenant, 'Tenant updated');
    }

    public function destroy(int $id): JsonResponse
    {
        $tenant = Tenant::findOrFail($id);
        AuditLog::record('tenant.deleted', $tenant);
        $tenant->delete();
        return $this->success(null, 'Tenant deleted');
    }

    public function updateBranding(Request $request, int $id): JsonResponse
    {
        $tenant = Tenant::findOrFail($id);
        $data = $request->validate([
            'primary_color'   => 'nullable|string|max:10',
            'secondary_color' => 'nullable|string|max:10',
            'font'            => 'nullable|string',
            'logo_url'        => 'nullable|string',
            'custom_domain'   => 'nullable|string|unique:tenants,custom_domain,' . $id,
        ]);

        $tenant->update($data);
        return $this->success($tenant, 'Branding updated');
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $request->validate(['status' => 'required|in:active,inactive,suspended']);
        $tenant = Tenant::findOrFail($id);
        $tenant->update(['status' => $request->status]);
        return $this->success($tenant, 'Status updated');
    }
}
