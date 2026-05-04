<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\CanvassingList;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoCampaignSeeder extends Seeder
{
    public function run(): void
    {
        $tenants = Tenant::all();

        foreach ($tenants as $tenant) {
            $campaign = Campaign::withoutGlobalScopes()->firstOrCreate(
                ['name' => '2026 General Election — National', 'tenant_id' => $tenant->id],
                [
                    'tenant_id'    => $tenant->id,
                    'name'         => '2026 General Election — National',
                    'type'         => 'general_election',
                    'status'       => 'active',
                    'description'  => "Main 2026 campaign for {$tenant->name}",
                    'start_date'   => now()->subMonths(2),
                    'end_date'     => now()->addMonths(6),
                    'turnout_goal' => 15000,
                ]
            );

            $admin = User::withoutGlobalScopes()
                ->where('tenant_id', $tenant->id)
                ->first();

            if ($admin) {
                $walkLists = [
                    ['name' => 'St. Christopher North — Zone A', 'area' => 'Zone A', 'total' => 320, 'visited' => 280, 'status' => 'active'],
                    ['name' => 'St. Christopher North — Zone B', 'area' => 'Zone B', 'total' => 290, 'visited' => 290, 'status' => 'completed'],
                    ['name' => 'Basseterre Central Walk',         'area' => 'Basseterre', 'total' => 410, 'visited' => 180, 'status' => 'active'],
                ];

                foreach ($walkLists as $wl) {
                    CanvassingList::withoutGlobalScopes()->firstOrCreate(
                        ['name' => $wl['name'], 'tenant_id' => $tenant->id],
                        [
                            'tenant_id'     => $tenant->id,
                            'campaign_id'   => $campaign->id,
                            'canvasser_id'  => $admin->id,
                            'area_name'     => $wl['area'],
                            'status'        => $wl['status'],
                            'total_voters'  => $wl['total'],
                            'visited_count' => $wl['visited'],
                            'walk_date'     => now()->addDays(1),
                        ]
                    );
                }
            }

            $this->command->info("Campaign & walk lists created for {$tenant->name}");
        }
    }
}
