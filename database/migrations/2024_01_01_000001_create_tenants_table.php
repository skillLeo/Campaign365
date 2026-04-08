<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('subdomain')->unique();
            $table->string('custom_domain')->nullable()->unique();
            $table->string('logo_url')->nullable();
            $table->string('primary_color')->default('#14B7A6');
            $table->string('secondary_color')->default('#10B981');
            $table->string('font')->default('Inter');
            $table->enum('plan', ['essentials', 'professional', 'enterprise', 'sovereign'])->default('essentials');
            $table->decimal('custom_price', 10, 2)->nullable();
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->json('feature_flags')->nullable();
            $table->json('settings')->nullable();
            $table->string('country')->nullable();
            $table->string('jurisdiction')->nullable();
            $table->string('billing_email')->nullable();
            $table->timestamp('trial_ends_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
