<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\Voter;
use Illuminate\Database\Seeder;

class DemoVoterSeeder extends Seeder
{
    private array $constituencies = [
        'sknlp' => ['St. Christopher 1', 'St. Christopher 2', 'St. Christopher 3', 'Nevis 1', 'Nevis 2'],
        'jlp'   => ['Kingston East', 'Kingston West', 'St. Andrew North', 'St. Catherine'],
        'janedoe' => ['Christ Church East', 'Christ Church West', 'St. Michael'],
    ];

    private array $sentiments = ['supporter', 'supporter', 'supporter', 'undecided', 'undecided', 'opposition', 'unknown'];

    public function run(): void
    {
        $tenants = Tenant::all();

        foreach ($tenants as $tenant) {
            $constituencies = $this->constituencies[$tenant->subdomain] ?? ['District 1', 'District 2'];
            $votersPerTenant = 180;

            for ($i = 0; $i < $votersPerTenant; $i++) {
                Voter::withoutGlobalScopes()->create([
                    'tenant_id'        => $tenant->id,
                    'first_name'       => fake()->firstName(),
                    'last_name'        => fake()->lastName(),
                    'address'          => fake()->streetAddress(),
                    'constituency'     => $constituencies[array_rand($constituencies)],
                    'polling_division' => 'PD-' . rand(1, 20),
                    'phone'            => '+1' . rand(1000000000, 9999999999),
                    'email'            => fake()->safeEmail(),
                    'age'              => rand(18, 80),
                    'gender'           => ['male', 'female'][rand(0, 1)],
                    'sentiment'        => $this->sentiments[array_rand($this->sentiments)],
                    'sentiment_score'  => rand(0, 100),
                    'turnout_probability' => rand(30, 90),
                ]);
            }

            $this->command->info("Created {$votersPerTenant} voters for {$tenant->name}");
        }
    }
}
