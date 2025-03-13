<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceStoreRequest;
use App\Http\Requests\InvoiceUpdateRequest;
use App\Models\Brand;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function index(Request $request): Response
    {
        $invoices = Invoice::all();

        return Inertia::render('invoice/index', [
            'invoices' => $invoices->load('customer'),
        ]);
    }

    public function create(Request $request): Response
    {
        $brands = Brand::all();
        $products = Product::all();

        return Inertia::render('invoice/create', [
            'brands' => $brands,
            'products' => $products,
        ]);
    }

    public function store(InvoiceStoreRequest $request): RedirectResponse
    {
        $invoice = Invoice::create($request->validated());

        $request->session()->flash('invoice.id', $invoice->id);

        return redirect()->route('invoices.index');
    }

    public function show(Request $request, Invoice $invoice): Response
    {
        return Inertia::render('invoice/show', [
            'invoice' => $invoice->load('invoiceProducts'),
        ]);
    }

    public function edit(Request $request, Invoice $invoice): Response
    {
        $brands = Brand::all();
        $products = Product::all();

        return Inertia::render('invoice/edit', [
            'invoice' => $invoice->load('invoiceProducts'),
            'brands' => $brands,
            'products' => $products,
        ]);
    }

    public function update(InvoiceUpdateRequest $request, Invoice $invoice): RedirectResponse
    {
        $invoice->update($request->validated());

        $request->session()->flash('invoice.id', $invoice->id);

        return redirect()->route('invoices.index');
    }

    public function destroy(Request $request, Invoice $invoice): RedirectResponse
    {
        $invoice->delete();

        return redirect()->route('invoices.index');
    }

    public function export(Request $request)
    {
        $invoices = Invoice::all();

        return $invoices;
    }
}
