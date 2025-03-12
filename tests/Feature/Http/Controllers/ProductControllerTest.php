<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\ProductController
 */
final class ProductControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $products = Product::factory()->count(3)->create();

        $response = $this->get(route('products.index'));

        $response->assertOk();
        $response->assertViewIs('product.index');
        $response->assertViewHas('products');
    }


    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('products.create'));

        $response->assertOk();
        $response->assertViewIs('product.create');
    }


    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\ProductController::class,
            'store',
            \App\Http\Requests\ProductStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $name = fake()->name();
        $slug = fake()->slug();
        $brand = Brand::factory()->create();
        $category = Category::factory()->create();
        $is_active = fake()->boolean();
        $is_featured = fake()->boolean();
        $is_hero = fake()->boolean();

        $response = $this->post(route('products.store'), [
            'name' => $name,
            'slug' => $slug,
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'is_active' => $is_active,
            'is_featured' => $is_featured,
            'is_hero' => $is_hero,
        ]);

        $products = Product::query()
            ->where('name', $name)
            ->where('slug', $slug)
            ->where('brand_id', $brand->id)
            ->where('category_id', $category->id)
            ->where('is_active', $is_active)
            ->where('is_featured', $is_featured)
            ->where('is_hero', $is_hero)
            ->get();
        $this->assertCount(1, $products);
        $product = $products->first();

        $response->assertRedirect(route('products.index'));
        $response->assertSessionHas('product.id', $product->id);
    }


    #[Test]
    public function show_displays_view(): void
    {
        $product = Product::factory()->create();

        $response = $this->get(route('products.show', $product));

        $response->assertOk();
        $response->assertViewIs('product.show');
        $response->assertViewHas('product');
    }


    #[Test]
    public function edit_displays_view(): void
    {
        $product = Product::factory()->create();

        $response = $this->get(route('products.edit', $product));

        $response->assertOk();
        $response->assertViewIs('product.edit');
        $response->assertViewHas('product');
    }


    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\ProductController::class,
            'update',
            \App\Http\Requests\ProductUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $product = Product::factory()->create();
        $name = fake()->name();
        $slug = fake()->slug();
        $brand = Brand::factory()->create();
        $category = Category::factory()->create();
        $is_active = fake()->boolean();
        $is_featured = fake()->boolean();
        $is_hero = fake()->boolean();

        $response = $this->put(route('products.update', $product), [
            'name' => $name,
            'slug' => $slug,
            'brand_id' => $brand->id,
            'category_id' => $category->id,
            'is_active' => $is_active,
            'is_featured' => $is_featured,
            'is_hero' => $is_hero,
        ]);

        $product->refresh();

        $response->assertRedirect(route('products.index'));
        $response->assertSessionHas('product.id', $product->id);

        $this->assertEquals($name, $product->name);
        $this->assertEquals($slug, $product->slug);
        $this->assertEquals($brand->id, $product->brand_id);
        $this->assertEquals($category->id, $product->category_id);
        $this->assertEquals($is_active, $product->is_active);
        $this->assertEquals($is_featured, $product->is_featured);
        $this->assertEquals($is_hero, $product->is_hero);
    }


    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $product = Product::factory()->create();

        $response = $this->delete(route('products.destroy', $product));

        $response->assertRedirect(route('products.index'));

        $this->assertSoftDeleted($product);
    }
}
