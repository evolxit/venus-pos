<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Invoice::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'invoice_no' => fake()->regexify('[A-Za-z0-9]{15}'),
            'order_date' => fake()->dateTime(),
            'customer_id' => Customer::factory(),
            'customer_phone' => fake()->word(),
            'customer_address' => fake()->regexify('[A-Za-z0-9]{400}'),
            'status' => fake()->randomElement(['draft', 'pending', 'processing', 'shipped', 'completed']),
            'payment_method' => fake()->word(),
            'shipping_date' => fake()->dateTime(),
            'est_arrival_date' => fake()->dateTime(),
            'region_delivery_fee' => fake()->numberBetween(1000, 1000),
            'remarks' => fake()->text(),
            'total_amount' => fake()->numberBetween(90000, 100000),
            'deposit_paid' => fake()->numberBetween(10000, 50000),
            'remaining_amount' => fake()->numberBetween(10000, 50000),
        ];
    }
}
