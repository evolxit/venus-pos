<?php

namespace App\Http\Controllers;

use App\Enums\InvoiceStatusEnum;
use App\Http\Requests\InvoiceStoreRequest;
use App\Http\Requests\InvoiceUpdateRequest;
use App\Models\Brand;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Product;
use Carbon\Carbon;
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
        $customers = Customer::all();
        $statuses = InvoiceStatusEnum::values();

        return Inertia::render('invoice/create', [
            'brands' => $brands,
            'products' => $products,
            'customers' => $customers,
            'statuses' => $statuses,
        ]);
    }

    public function store(InvoiceStoreRequest $request): RedirectResponse
    {
        // $invoice = Invoice::create($request->validated());
        $invoice = new Invoice;
        $invoice->invoice_no = $request->invoice_no;
        $invoice->customer_id = $request->customer['id'];
        $invoice->customer_phone = $request->customer_phone;
        $invoice->customer_address = $request->customer_address;
        $invoice->status = $request->status;
        $invoice->payment_method = $request->payment_method;
        $invoice->region_delivery_fee = $request->region_delivery_fee;
        $invoice->remarks = $request->remarks;
        $invoice->total_amount = 0;
        $invoice->deposit_paid = $request->deposit_paid;
        $invoice->remaining_amount = 0;
        $invoice->order_date = $request->order_date ? Carbon::parse($request->order_date)->format('Y-m-d H:i:s') : null;
        $invoice->shipping_date = $request->shipping_date ? Carbon::parse($request->shipping_date)->format('Y-m-d H:i:s') : null;
        $invoice->est_arrival_date = $request->est_arrival_date ? Carbon::parse($request->est_arrival_date)->format('Y-m-d H:i:s') : null;
        $invoice->save();
        $subtotal = 0;

        foreach ($request->invoiceProducts as $invoiceProduct) {
            $invoice->invoiceProducts()->create([
                'product_id' => $invoiceProduct['product']['id'],
                'qty' => $invoiceProduct['qty'],
                'unit_selling_price' => $invoiceProduct['unit_selling_price'],
                'unit_total' => $invoiceProduct['unit_total'],
                'remarks' => $invoiceProduct['remarks'],
                'type' => $invoiceProduct['type'],
                'size' => $invoiceProduct['size'],
            ]);
            $subtotal += $invoiceProduct['unit_total'];
        }

        $invoice->update([
            'total_amount' => $subtotal,
            'remaining_amount' => $subtotal - $request->deposit_paid,
        ]);

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
        $customers = Customer::all();

        return Inertia::render('invoice/edit', [
            'invoice' => $invoice->load('invoiceProducts'),
            'brands' => $brands,
            'products' => $products,
            'customers' => $customers,
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
