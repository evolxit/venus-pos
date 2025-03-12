<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Customer::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->text(),
            'prepaid_balance' => fake()->numberBetween(-100000, 100000),
            'credit_amount' => fake()->numberBetween(-100000, 100000),
            'is_active' => fake()->boolean(),
        ];
    }
}
