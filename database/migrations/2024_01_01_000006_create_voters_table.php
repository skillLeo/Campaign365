<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('voters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('address');
            $table->string('constituency')->nullable();
            $table->string('polling_division')->nullable();
            $table->string('parish')->nullable();
            $table->string('ward')->nullable();
            $table->string('district')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->integer('age')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('ethnicity')->nullable();
            $table->json('voting_history')->nullable();
            $table->enum('sentiment', ['supporter', 'undecided', 'opposition', 'unknown'])->default('unknown');
            $table->decimal('sentiment_score', 5, 2)->default(0);
            $table->decimal('turnout_probability', 5, 2)->default(0);
            $table->decimal('persuasion_score', 5, 2)->default(0);
            $table->json('custom_tags')->nullable();
            $table->string('preferred_language')->default('en');
            $table->boolean('do_not_contact')->default(false);
            $table->timestamp('last_contacted_at')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['tenant_id', 'constituency']);
            $table->index(['tenant_id', 'sentiment']);
            $table->index(['tenant_id', 'polling_division']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('voters');
    }
};
