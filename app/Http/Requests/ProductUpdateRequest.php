<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
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
            'slug' => ['required', 'string', 'max:400'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'string'],
            'color' => ['nullable', 'json'],
            'size' => ['nullable', 'json'],
            'brand_id' => ['required', 'integer', 'exists:brands,id'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'is_active' => ['required', 'boolean'],
            'is_featured' => ['required', 'boolean'],
            'is_hero' => ['required', 'boolean'],
            'start_price_mmk' => ['required', 'integer'],
            'start_price_usd' => ['required', 'integer'],
        ];
    }
}
