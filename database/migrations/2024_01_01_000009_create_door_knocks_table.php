<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('door_knocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('canvassing_list_id')->constrained()->onDelete('cascade');
            $table->foreignId('voter_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('canvasser_id')->nullable();
            $table->foreign('canvasser_id')->references('id')->on('users')->nullOnDelete();
            $table->enum('result', ['answered', 'not_home', 'refused', 'moved', 'deceased', 'callback'])->nullable();
            $table->enum('sentiment', ['supporter', 'undecided', 'opposition', 'unknown'])->default('unknown');
            $table->text('notes')->nullable();
            $table->string('voice_note_url')->nullable();
            $table->text('transcription')->nullable();
            $table->decimal('transcription_sentiment_score', 5, 2)->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->boolean('synced')->default(true);
            $table->timestamp('knocked_at');
            $table->timestamps();
            $table->index(['tenant_id', 'voter_id']);
            $table->index(['tenant_id', 'canvasser_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('door_knocks');
    }
};
