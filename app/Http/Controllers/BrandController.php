<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrandStoreRequest;
use App\Http\Requests\BrandUpdateRequest;
use App\Models\Brand;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    public function index(Request $request): Response
    {
        $brands = Brand::all();

        return Inertia::render('brand/index', [
            'brands' => $brands,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('brand/create');
    }

    public function store(BrandStoreRequest $request): RedirectResponse
    {
        $brand = Brand::create($request->validated());

        $request->session()->flash('brand.id', $brand->id);

        return redirect()->route('brands.index');
    }

    public function show(Request $request, Brand $brand): Response
    {
        return Inertia::render('brand/show', [
            'brand' => $brand,
        ]);
    }

    public function edit(Request $request, Brand $brand): Response
    {
        return Inertia::render('brand/edit', [
            'brand' => $brand,
        ]);
    }

    public function update(BrandUpdateRequest $request, Brand $brand): RedirectResponse
    {
        $brand->update($request->validated());

        $request->session()->flash('brand.id', $brand->id);

        return redirect()->route('brands.index');
    }

    public function destroy(Request $request, Brand $brand): RedirectResponse
    {
        $brand->delete();

        return redirect()->route('brands.index');
    }
}
