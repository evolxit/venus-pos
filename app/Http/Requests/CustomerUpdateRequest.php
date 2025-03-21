<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerUpdateRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:400'],
            'email' => ['nullable', 'email', 'max:400'],
            'phone' => ['nullable', 'string', 'max:400'],
            'address' => ['nullable', 'string'],
            'prepaid_balance' => ['nullable', 'integer'],
            'credit_amount' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
