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

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 400);
            $table->string('slug', 400);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->json('color')->nullable();
            $table->json('size')->nullable();
            $table->foreignId('brand_id')->constrained();
            $table->foreignId('category_id')->constrained();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_hero')->default(false);
            $table->integer('start_price_mmk')->default(0);
            $table->integer('start_price_sgd')->default(0);
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
        Schema::dropIfExists('products');
    }
};
