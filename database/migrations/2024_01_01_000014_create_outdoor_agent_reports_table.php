<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('outdoor_agent_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('agent_id')->references('id')->on('users');
            $table->string('polling_station_name');
            $table->string('polling_station_code')->nullable();
            $table->string('constituency');
            $table->integer('expected_voters')->default(0);
            $table->integer('voted_count')->default(0);
            $table->decimal('turnout_percentage', 5, 2)->default(0);
            $table->enum('status', ['active', 'slow', 'closed'])->default('active');
            $table->text('notes')->nullable();
            $table->timestamp('report_time');
            $table->timestamps();
            $table->index(['tenant_id', 'polling_station_code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('outdoor_agent_reports');
    }
};
