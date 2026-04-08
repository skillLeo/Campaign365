<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class DemoCampaignSeeder extends Seeder
{
    public function run(): void
    {
        $tenants = Tenant::all();

        foreach ($tenants as $tenant) {
            Campaign::withoutGlobalScopes()->firstOrCreate(
                ['name' => '2025 General Election', 'tenant_id' => $tenant->id],
                [
                    'tenant_id'    => $tenant->id,
                    'name'         => '2025 General Election',
                    'type'         => 'general_election',
                    'status'       => 'active',
                    'description'  => "Main campaign for {$tenant->name}",
                    'start_date'   => now()->subMonths(2),
                    'end_date'     => now()->addMonths(3),
                    'turnout_goal' => 10000,
                ]
            );

            $this->command->info("Campaign created for {$tenant->name}");
        }
    }
}
