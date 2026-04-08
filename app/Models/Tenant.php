<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tenant extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'subdomain', 'custom_domain', 'logo_url',
        'primary_color', 'secondary_color', 'font', 'plan',
        'custom_price', 'status', 'feature_flags', 'settings',
        'country', 'jurisdiction', 'billing_email', 'trial_ends_at',
    ];

    protected $casts = [
        'feature_flags' => 'array',
        'settings'      => 'array',
        'trial_ends_at' => 'datetime',
    ];

    public function users(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(User::class);
    }

    public function voters(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Voter::class);
    }

    public function campaigns(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Campaign::class);
    }

    public function donations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Donation::class);
    }

    public function hasFeature(string $feature): bool
    {
        $flags = $this->feature_flags ?? [];
        if (isset($flags[$feature])) {
            return (bool) $flags[$feature];
        }
        return $this->planHasFeature($feature);
    }

    private function planHasFeature(string $feature): bool
    {
        $planFeatures = [
            'essentials'   => ['mobile_app', 'offline_canvassing', 'gps_tracking', 'panic_button', 'email_limited', 'sms_limited', 'edge_ai'],
            'professional' => ['mobile_app', 'offline_canvassing', 'gps_tracking', 'panic_button', 'email_unlimited', 'sms_full', 'whatsapp', 'openai', 'fundraising', 'polling', 'edge_ai'],
            'enterprise'   => ['mobile_app', 'offline_canvassing', 'gps_tracking', 'panic_button', 'email_unlimited', 'sms_unlimited', 'whatsapp_unlimited', 'openai', 'fundraising', 'polling', 'compliance_full', 'custom_domain', 'white_label', 'edge_ai'],
            'sovereign'    => ['all'],
        ];

        $features = $planFeatures[$this->plan] ?? [];
        return in_array('all', $features) || in_array($feature, $features);
    }
}
