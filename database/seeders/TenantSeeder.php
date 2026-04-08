<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        $tenants = [
            [
                'tenant' => [
                    'name'            => 'St. Kitts Nevis Labour Party',
                    'subdomain'       => 'sknlp',
                    'primary_color'   => '#CC0000',
                    'secondary_color' => '#000000',
                    'plan'            => 'enterprise',
                    'country'         => 'St. Kitts and Nevis',
                    'jurisdiction'    => 'caribbean',
                    'billing_email'   => 'billing@sknlp.org',
                    'status'          => 'active',
                ],
                'admin' => [
                    'name'  => 'General Secretary SKNLP',
                    'email' => 'admin@sknlp.campaign365.app',
                ],
            ],
            [
                'tenant' => [
                    'name'            => 'Jamaica Labour Party',
                    'subdomain'       => 'jlp',
                    'primary_color'   => '#006400',
                    'secondary_color' => '#FFD700',
                    'plan'            => 'professional',
                    'country'         => 'Jamaica',
                    'jurisdiction'    => 'jamaica',
                    'billing_email'   => 'billing@jlp.org.jm',
                    'status'          => 'active',
                ],
                'admin' => [
                    'name'  => 'Campaign Manager JLP',
                    'email' => 'admin@jlp.campaign365.app',
                ],
            ],
            [
                'tenant' => [
                    'name'            => 'Jane Doe Independent Campaign',
                    'subdomain'       => 'janedoe',
                    'primary_color'   => '#14B7A6',
                    'secondary_color' => '#10B981',
                    'plan'            => 'essentials',
                    'country'         => 'Barbados',
                    'jurisdiction'    => 'caribbean',
                    'billing_email'   => 'jane@janedoe.com',
                    'status'          => 'active',
                ],
                'admin' => [
                    'name'  => 'Jane Doe',
                    'email' => 'admin@janedoe.campaign365.app',
                ],
            ],
        ];

        foreach ($tenants as $data) {
            $tenant = Tenant::firstOrCreate(
                ['subdomain' => $data['tenant']['subdomain']],
                $data['tenant']
            );

            $user = User::withoutGlobalScopes()->firstOrCreate(
                ['email' => $data['admin']['email'], 'tenant_id' => $tenant->id],
                [
                    'name'      => $data['admin']['name'],
                    'tenant_id' => $tenant->id,
                    'password'  => Hash::make('password'),
                    'status'    => 'active',
                ]
            );
            $user->assignRole('general_secretary');

            $this->command->info("Tenant created: {$tenant->subdomain} — Admin: {$data['admin']['email']} / password");
        }
    }
}
