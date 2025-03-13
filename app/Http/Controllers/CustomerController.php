<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(Request $request): Response
    {
        $customers = Customer::all();

        return Inertia::render('customer/index', [
            'customers' => $customers,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('customer/create');
    }

    public function store(CustomerStoreRequest $request): RedirectResponse
    {
        $customer = Customer::create($request->validated());

        $request->session()->flash('customer.id', $customer->id);

        return redirect()->route('customers.index');
    }

    public function show(Request $request, Customer $customer): Response
    {
        return Inertia::render('customer/show', [
            'customer' => $customer,
        ]);
    }

    public function edit(Request $request, Customer $customer): Response
    {
        return Inertia::render('customer/edit', [
            'customer' => $customer,
        ]);
    }

    public function update(CustomerUpdateRequest $request, Customer $customer): RedirectResponse
    {
        $customer->update($request->validated());

        $request->session()->flash('customer.id', $customer->id);

        return redirect()->route('customers.index');
    }

    public function destroy(Request $request, Customer $customer): RedirectResponse
    {
        $customer->delete();

        return redirect()->route('customers.index');
    }

    public function export(Request $request)
    {
        $customers = Customer::all();

        return $customers;
    }
}
