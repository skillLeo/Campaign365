<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            // Voters
            'voters.view', 'voters.create', 'voters.edit', 'voters.delete', 'voters.import',
            // Campaigns
            'campaigns.view', 'campaigns.create', 'campaigns.edit', 'campaigns.delete',
            // Canvassing
            'canvassing.view', 'canvassing.manage', 'canvassing.doorknock',
            // GPS
            'gps.track', 'gps.view_all', 'gps.panic',
            // Communications
            'communications.email', 'communications.sms', 'communications.whatsapp',
            // Fundraising
            'fundraising.view', 'fundraising.manage',
            // Reports
            'reports.view', 'reports.compliance',
            // Users
            'users.view', 'users.manage',
            // Settings
            'settings.view', 'settings.manage',
            // GOTV
            'gotv.view', 'gotv.report',
            // Runners
            'runners.view', 'runners.manage',
            // Surveys
            'surveys.view', 'surveys.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $roles = [
            'general_secretary' => Permission::all()->pluck('name')->toArray(),
            'campaign_manager'  => [
                'voters.view', 'voters.create', 'voters.edit', 'voters.import',
                'campaigns.view', 'campaigns.create', 'campaigns.edit',
                'canvassing.view', 'canvassing.manage',
                'gps.view_all', 'gps.panic',
                'communications.email', 'communications.sms', 'communications.whatsapp',
                'fundraising.view', 'reports.view', 'reports.compliance',
                'users.view', 'users.manage', 'gotv.view', 'gotv.report',
                'runners.view', 'runners.manage', 'surveys.view', 'surveys.manage',
            ],
            'campaign_director' => [
                'voters.view', 'voters.import',
                'campaigns.view', 'campaigns.create', 'campaigns.edit',
                'communications.email', 'communications.sms', 'communications.whatsapp',
                'fundraising.view', 'fundraising.manage',
                'reports.view', 'surveys.view', 'surveys.manage',
            ],
            'region_manager' => [
                'voters.view', 'canvassing.view', 'canvassing.manage',
                'gps.view_all', 'gps.panic', 'gotv.view', 'gotv.report',
                'runners.view', 'runners.manage', 'reports.view',
            ],
            'branch_manager' => [
                'voters.view', 'canvassing.view', 'canvassing.manage',
                'gps.view_all', 'gps.panic', 'gotv.view', 'runners.view',
            ],
            'data_manager' => [
                'voters.view', 'voters.create', 'voters.edit', 'voters.import',
                'reports.view',
            ],
            'outdoor_agent'      => ['gotv.report', 'gps.track'],
            'political_candidate' => ['gps.track', 'gps.panic', 'canvassing.view'],
            'runner'              => ['gps.track', 'gps.panic', 'runners.view'],
            'phone_bank'          => ['voters.view', 'canvassing.doorknock'],
            'canvasser'           => ['canvassing.doorknock', 'canvassing.view', 'gps.track', 'gps.panic'],
            'field_organizer'     => ['canvassing.view', 'canvassing.manage', 'gps.view_all', 'gotv.view'],
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
            $role->syncPermissions($rolePermissions);
        }

        $this->command->info('Roles and permissions seeded successfully.');
    }
}
