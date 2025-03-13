<?php

namespace App\Enums;

enum InvoiceStatusEnum: string
{
    case DRAFT = 'draft';
    case PENDING = 'pending';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case COMPLETED = 'completed';
}
