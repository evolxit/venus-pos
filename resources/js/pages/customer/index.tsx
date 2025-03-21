import { CreateBtn } from '@/components/buttons/create-btn';
import { DataTable, DataTableActions } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// Dummy interface
// Update your types file and import from it
type Customer = {
    id?: number;
    name: string;
    created_at?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer',
        href: route('customers.index'),
    },
];

const columns: ColumnDef<Customer>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <Link
                className="text-link"
                href={route('customers.show', {
                    customer: row.original.id,
                })}
            >
                {row.getValue('name')}
            </Link>
        ),
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => <div className="">{row.getValue('phone')}</div>,
    },
    {
        accessorKey: 'prepaid_balance',
        header: 'Prepaid Balance',
        cell: ({ row }) => <div className="">{row.getValue('prepaid_balance')} Ks</div>,
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ row }) => <div className="">{row.getValue('created_at')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const param = { customer: row.original.id };

            return <DataTableActions routePrefix="customers" routeParam={param} />;
        },
    },
];

export default function CustomerIndex({ customers }: { customers: Customer[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row justify-between">
                    <CreateBtn route={route('customers.create')} />
                    {/* <ExportBtn route={route('customers.export')} /> */}
                </div>
                <DataTable data={customers} columns={columns} />
            </div>
        </AppLayout>
    );
}
