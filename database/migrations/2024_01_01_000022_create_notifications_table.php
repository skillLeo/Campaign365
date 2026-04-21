<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('type'); // 'urgent', 'canvassing', 'runners', 'fundraising', 'system'
            $table->string('title');
            $table->text('body');
            $table->json('data')->nullable();   // extra payload
            $table->string('action_url')->nullable();
            $table->boolean('is_read')->default(false);
            $table->boolean('is_broadcast')->default(false); // sent to all users of tenant
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->index(['tenant_id', 'user_id', 'is_read']);
            $table->index(['tenant_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
