<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('canvassing_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('campaign_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('canvasser_id')->nullable();
            $table->foreign('canvasser_id')->references('id')->on('users')->nullOnDelete();
            $table->string('name');
            $table->json('turf_geojson')->nullable();
            $table->string('area_name')->nullable();
            $table->enum('status', ['pending', 'active', 'completed', 'offline'])->default('pending');
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->integer('total_voters')->default(0);
            $table->integer('visited_count')->default(0);
            $table->date('walk_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('canvassing_lists');
    }
};
