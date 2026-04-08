<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('compliance_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->enum('jurisdiction', ['jamaica', 'uk', 'canada', 'caribbean'])->default('jamaica');
            $table->enum('report_type', ['financial_disclosure', 'voter_data', 'campaign_activity', 'full'])->default('full');
            $table->json('report_data');
            $table->enum('status', ['draft', 'generated', 'submitted'])->default('draft');
            $table->timestamp('generated_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('compliance_reports');
    }
};
