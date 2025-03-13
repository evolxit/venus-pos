import { CreateBtn } from '@/components/buttons/create-btn';
import { ExportBtn } from '@/components/buttons/export-btn';
import { DataTable, DataTableActions } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Customer, InvoiceProduct } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// Dummy interface
// Update your types file and import from it
type Invoice = {
    id?: number;
    invoice_no: string;
    order_date: string;
    customer_phone: string;
    customer_address: string;
    payment_method: string;
    shipping_date: string;
    est_arrival_date: string;
    region_delivery_fee: number;
    remarks: string;
    total_amount: number;
    deposit_paid: number;
    remaing_amount: number;
    customer: Customer;
    invoiceProducts: InvoiceProduct[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice',
        href: route('invoices.index'),
    },
];

const columns: ColumnDef<Invoice>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'invoice_no',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Invoice No.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <Link
                className="text-link"
                href={route('invoices.show', {
                    invoice: row.original.id,
                })}
            >
                {row.getValue('invoice_no')}
            </Link>
        ),
    },
    {
        accessorKey: 'order_date',
        header: 'Order Date',
        cell: ({ row }) => <div className="">{row.getValue('order_date')}</div>,
    },
    {
        accessorKey: 'customer',
        header: 'Customer',
        cell: ({ row }) => <div className="">{row.getValue<Customer>('customer').name}</div>,
    },
    {
        accessorKey: 'total_amount',
        header: 'Total',
        cell: ({ row }) => <div className="">{row.getValue('total_amount')}</div>,
    },
    {
        accessorKey: 'deposit_paid',
        header: 'Paid',
        cell: ({ row }) => <div className="">{row.getValue('deposit_paid')}</div>,
    },
    {
        accessorKey: 'remaining_amount',
        header: 'Remaining',
        cell: ({ row }) => <div className="">{row.getValue('remaining_amount')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const param = { invoice: row.original.id };

            return <DataTableActions routePrefix="invoices" routeParam={param} />;
        },
    },
];

export default function InvoiceIndex({ invoices }: { invoices: Invoice[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoice" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row justify-between">
                    <CreateBtn route={route('invoices.create')} />
                    <ExportBtn route={route('invoices.export')} />
                </div>
                <DataTable data={invoices} columns={columns} />
            </div>
        </AppLayout>
    );
}
