<?php

namespace App\Models;

use App\Enums\InvoiceStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends BaseModel
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'invoice_no',
        'order_date',
        'customer_id',
        'customer_phone',
        'customer_address',
        'status',
        'payment_method',
        'shipping_date',
        'est_arrival_date',
        'region_delivery_fee',
        'remarks',
        'total_amount',
        'deposit_paid',
        'remaining_amount',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        // 'order_date' => 'timestamp',
        'customer_id' => 'integer',
        'status' => InvoiceStatusEnum::class,
        // 'shipping_date' => 'timestamp',
        // 'est_arrival_date' => 'timestamp',
        'total_amount' => 'integer',
        'deposit_paid' => 'integer',
        'remaining_amount' => 'integer',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function invoiceProducts(): HasMany
    {
        return $this->hasMany(InvoiceProduct::class);
    }

    public function getOrderDateAttribute($value)
    {
        return $value ? $this->asDateTime($value)->format('Y/m/d') : null;
    }
}
