<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('donor_name');
            $table->string('donor_email')->nullable();
            $table->string('donor_phone')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('USD');
            $table->enum('payment_gateway', ['powertranz', 'wipay', 'stripe', 'cash', 'cheque'])->default('stripe');
            $table->string('transaction_id')->nullable();
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded'])->default('pending');
            $table->enum('type', ['one_time', 'recurring'])->default('one_time');
            $table->boolean('is_anonymous')->default(false);
            $table->text('notes')->nullable();
            $table->timestamp('donated_at');
            $table->timestamps();
            $table->index(['tenant_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
