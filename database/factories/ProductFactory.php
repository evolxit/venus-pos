<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'slug' => fake()->slug(),
            'description' => fake()->text(),
            'image' => fake()->word(),
            'color' => ['blue', 'red', 'green'],
            'size' => ['small', 'medium', 'large'],
            'brand_id' => Brand::factory(),
            'category_id' => Category::factory(),
            'is_active' => fake()->boolean(),
            'is_featured' => fake()->boolean(),
            'is_hero' => fake()->boolean(),
        ];
    }
}
