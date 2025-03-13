<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::all();

        return Inertia::render('product/index', [
            'products' => $products->load('brand', 'category'),
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('product/create');
    }

    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $product = Product::create($request->validated());

        $request->session()->flash('product.id', $product->id);

        return redirect()->route('products.index');
    }

    public function show(Request $request, Product $product): Response
    {
        return Inertia::render('product/show', [
            'product' => $product->load('brand', 'category'),
        ]);
    }

    public function edit(Request $request, Product $product): Response
    {
        return Inertia::render('product/edit', [
            'product' => $product,
        ]);
    }

    public function update(ProductUpdateRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());

        $request->session()->flash('product.id', $product->id);

        return redirect()->route('products.index');
    }

    public function destroy(Request $request, Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}
