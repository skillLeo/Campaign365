<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TenantSettingsController extends Controller
{
    use ApiResponse;

    /**
     * Get all settings for the current tenant.
     */
    public function index(): JsonResponse
    {
        $tenant = app('current_tenant');

        return $this->success([
            'id'              => $tenant->id,
            'name'            => $tenant->name,
            'subdomain'       => $tenant->subdomain,
            'custom_domain'   => $tenant->custom_domain,
            'logo_url'        => $tenant->logo_url,
            'primary_color'   => $tenant->primary_color,
            'secondary_color' => $tenant->secondary_color,
            'font'            => $tenant->font,
            'plan'            => $tenant->plan,
            'country'         => $tenant->country,
            'jurisdiction'    => $tenant->jurisdiction,
            'billing_email'   => $tenant->billing_email,
            'feature_flags'   => $tenant->feature_flags ?? [],
            'settings'        => $tenant->settings ?? [],
            'trial_ends_at'   => $tenant->trial_ends_at,
        ]);
    }

    /**
     * Update tenant branding settings.
     */
    public function updateBranding(Request $request): JsonResponse
    {
        $tenant = app('current_tenant');

        $data = $request->validate([
            'logo_url'        => 'nullable|url|max:500',
            'font'            => 'nullable|string|max:100',
        ]);

        // Note: primary_color and secondary_color are controlled by Super Admin only
        $tenant->update($data);

        return $this->success($tenant->fresh(), 'Branding updated');
    }

    /**
     * Update tenant general settings (non-branding).
     */
    public function updateSettings(Request $request): JsonResponse
    {
        $tenant = app('current_tenant');

        $data = $request->validate([
            'billing_email'              => 'nullable|email',
            'settings'                   => 'nullable|array',
            'settings.sms_sender_id'     => 'nullable|string|max:11',
            'settings.email_reply_to'    => 'nullable|email',
            'settings.default_language'  => 'nullable|in:en,fr,es,ar',
            'settings.timezone'          => 'nullable|string|max:50',
            'settings.date_format'       => 'nullable|string|max:20',
            'settings.canvassing_script' => 'nullable|string|max:2000',
        ]);

        $existing = $tenant->settings ?? [];
        $newSettings = array_merge($existing, $data['settings'] ?? []);

        $tenant->update([
            'billing_email' => $data['billing_email'] ?? $tenant->billing_email,
            'settings'      => $newSettings,
        ]);

        return $this->success($tenant->fresh(), 'Settings updated');
    }

    /**
     * Upload a new logo for the tenant.
     */
    public function uploadLogo(Request $request): JsonResponse
    {
        $request->validate([
            'logo' => 'required|image|mimes:png,jpg,jpeg,svg|max:2048',
        ]);

        $tenant = app('current_tenant');

        // Delete old logo if stored locally
        if ($tenant->logo_url && str_starts_with($tenant->logo_url, 'logos/')) {
            Storage::disk('public')->delete($tenant->logo_url);
        }

        $path = $request->file('logo')->store("logos/{$tenant->id}", 'public');
        $url  = Storage::disk('public')->url($path);

        $tenant->update(['logo_url' => $url]);

        return $this->success(['logo_url' => $url], 'Logo uploaded');
    }

    /**
     * Get the plan features available for the current tenant.
     */
    public function planFeatures(): JsonResponse
    {
        $tenant = app('current_tenant');

        $allFeatures = [
            'mobile_app', 'offline_canvassing', 'gps_tracking', 'panic_button',
            'email_limited', 'email_unlimited', 'sms_limited', 'sms_full',
            'sms_unlimited', 'whatsapp', 'whatsapp_unlimited',
            'openai', 'fundraising', 'polling', 'compliance_full',
            'custom_domain', 'white_label', 'edge_ai',
        ];

        $available = [];
        foreach ($allFeatures as $feature) {
            $available[$feature] = $tenant->hasFeature($feature);
        }

        return $this->success([
            'plan'           => $tenant->plan,
            'features'       => $available,
            'feature_flags'  => $tenant->feature_flags ?? [],
        ]);
    }
}
