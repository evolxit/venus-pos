<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'color',
        'size',
        'brand_id',
        'category_id',
        'is_active',
        'is_featured',
        'is_hero',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'color' => 'array',
        'size' => 'array',
        'brand_id' => 'integer',
        'category_id' => 'integer',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'is_hero' => 'boolean',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
