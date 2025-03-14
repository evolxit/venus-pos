<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\InvoiceProduct;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = InvoiceProduct::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'invoice_id' => Invoice::factory(),
            'brand_id' => Product::factory(),
            'product_id' => Product::factory(),
            'type' => fake()->word(),
            'size' => fake()->word(),
            'qty' => fake()->numberBetween(-10000, 10000),
            'unit_selling_price' => fake()->numberBetween(-100000, 100000),
            'unit_total' => fake()->numberBetween(-100000, 100000),
            'remarks' => fake()->text(),
        ];
    }
}
