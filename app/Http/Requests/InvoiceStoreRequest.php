<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'invoice_no' => ['required', 'string', 'max:400'],
            'order_date' => ['nullable'],
            'customer_id' => ['nullable', 'integer', 'exists:customers,id'],
            'customer_phone' => ['nullable', 'string'],
            'customer_address' => ['nullable', 'string', 'max:400'],
            'status' => ['required', 'in:draft,pending,processing,shipped,completed'],
            'payment_method' => ['nullable', 'string'],
            'shipping_date' => ['nullable'],
            'est_arrival_date' => ['nullable'],
            'region_delivery_fee' => ['nullable', 'integer'],
            'remarks' => ['nullable', 'string'],
            'total_amount' => ['nullable', 'integer'],
            'deposit_paid' => ['nullable', 'integer'],
            'remaining_amount' => ['nullable', 'integer'],
        ];
    }
}
