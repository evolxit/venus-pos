<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\InvoiceController
 */
final class InvoiceControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    #[Test]
    public function index_displays_view(): void
    {
        $invoices = Invoice::factory()->count(3)->create();

        $response = $this->get(route('invoices.index'));

        $response->assertOk();
        $response->assertViewIs('invoice.index');
        $response->assertViewHas('invoices');
    }

    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('invoices.create'));

        $response->assertOk();
        $response->assertViewIs('invoice.create');
    }

    #[Test]
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\InvoiceController::class,
            'store',
            \App\Http\Requests\InvoiceStoreRequest::class
        );
    }

    #[Test]
    public function store_saves_and_redirects(): void
    {
        $invoice_no = fake()->word();
        $customer = Customer::factory()->create();
        $status = fake()->randomElement(/** enum_attributes **/);
        $total_amount = fake()->numberBetween(-100000, 100000);
        $deposit_paid = fake()->numberBetween(-100000, 100000);
        $remaining_amount = fake()->numberBetween(-100000, 100000);

        $response = $this->post(route('invoices.store'), [
            'invoice_no' => $invoice_no,
            'customer_id' => $customer->id,
            'status' => $status,
            'total_amount' => $total_amount,
            'deposit_paid' => $deposit_paid,
            'remaining_amount' => $remaining_amount,
        ]);

        $invoices = Invoice::query()
            ->where('invoice_no', $invoice_no)
            ->where('customer_id', $customer->id)
            ->where('status', $status)
            ->where('total_amount', $total_amount)
            ->where('deposit_paid', $deposit_paid)
            ->where('remaining_amount', $remaining_amount)
            ->get();
        $this->assertCount(1, $invoices);
        $invoice = $invoices->first();

        $response->assertRedirect(route('invoices.index'));
        $response->assertSessionHas('invoice.id', $invoice->id);
    }

    #[Test]
    public function show_displays_view(): void
    {
        $invoice = Invoice::factory()->create();

        $response = $this->get(route('invoices.show', $invoice));

        $response->assertOk();
        $response->assertViewIs('invoice.show');
        $response->assertViewHas('invoice');
    }

    #[Test]
    public function edit_displays_view(): void
    {
        $invoice = Invoice::factory()->create();

        $response = $this->get(route('invoices.edit', $invoice));

        $response->assertOk();
        $response->assertViewIs('invoice.edit');
        $response->assertViewHas('invoice');
    }

    #[Test]
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\InvoiceController::class,
            'update',
            \App\Http\Requests\InvoiceUpdateRequest::class
        );
    }

    #[Test]
    public function update_redirects(): void
    {
        $invoice = Invoice::factory()->create();
        $invoice_no = fake()->word();
        $customer = Customer::factory()->create();
        $status = fake()->randomElement(/** enum_attributes **/);
        $total_amount = fake()->numberBetween(-100000, 100000);
        $deposit_paid = fake()->numberBetween(-100000, 100000);
        $remaining_amount = fake()->numberBetween(-100000, 100000);

        $response = $this->put(route('invoices.update', $invoice), [
            'invoice_no' => $invoice_no,
            'customer_id' => $customer->id,
            'status' => $status,
            'total_amount' => $total_amount,
            'deposit_paid' => $deposit_paid,
            'remaining_amount' => $remaining_amount,
        ]);

        $invoice->refresh();

        $response->assertRedirect(route('invoices.index'));
        $response->assertSessionHas('invoice.id', $invoice->id);

        $this->assertEquals($invoice_no, $invoice->invoice_no);
        $this->assertEquals($customer->id, $invoice->customer_id);
        $this->assertEquals($status, $invoice->status);
        $this->assertEquals($total_amount, $invoice->total_amount);
        $this->assertEquals($deposit_paid, $invoice->deposit_paid);
        $this->assertEquals($remaining_amount, $invoice->remaining_amount);
    }

    #[Test]
    public function destroy_deletes_and_redirects(): void
    {
        $invoice = Invoice::factory()->create();

        $response = $this->delete(route('invoices.destroy', $invoice));

        $response->assertRedirect(route('invoices.index'));

        $this->assertSoftDeleted($invoice);
    }

    #[Test]
    public function export_responds_with(): void
    {
        $invoices = Invoice::factory()->count(3)->create();

        $response = $this->get(route('invoices.export'));

        $response->assertOk();
        $response->assertJson($invoices);
    }
}
