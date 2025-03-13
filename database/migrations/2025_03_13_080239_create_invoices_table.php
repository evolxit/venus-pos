<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no', 400);
            $table->timestamp('order_date')->nullable();
            $table->foreignId('customer_id')->constrained();
            $table->string('customer_phone')->nullable();
            $table->string('customer_address', 400)->nullable();
            $table->enum('status', ['draft', 'pending', 'processing', 'shipped', 'completed']);
            $table->string('payment_method')->nullable();
            $table->timestamp('shipping_date')->nullable();
            $table->timestamp('est_arrival_date')->nullable();
            $table->integer('region_delivery_fee')->nullable();
            $table->text('remarks')->nullable();
            $table->bigInteger('total_amount');
            $table->bigInteger('deposit_paid');
            $table->bigInteger('remaining_amount');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
