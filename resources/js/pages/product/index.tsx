import { CreateBtn } from '@/components/buttons/create-btn';
import { DataTable, DataTableActions } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { Brand, BreadcrumbItem, Category } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// Dummy interface
// Update your types file and import from it
type Product = {
    id?: number;
    name: string;
    is_active: boolean;
    is_featured: boolean;
    is_hero: boolean;
    brand: Brand;
    category: Category;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: route('products.index'),
    },
];

const columns: ColumnDef<Product>[] = [
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
                href={route('products.show', {
                    product: row.original.id,
                })}
            >
                {row.getValue('name')}
            </Link>
        ),
    },
    {
        accessorKey: 'brand',
        header: 'Brand',
        cell: ({ row }) => <div className="">{row.getValue<Brand>('brand').name}</div>,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <div className="">{row.getValue<Category>('category').name}</div>,
    },
    {
        accessorKey: 'is_active',
        header: 'Active',
        cell: ({ row }) => <div className="">{row.getValue('is_active') ? 'Yes' : 'No'}</div>,
    },
    {
        accessorKey: 'is_featured',
        header: 'Featured',
        cell: ({ row }) => <div className="">{row.getValue('is_featured') ? 'Yes' : 'No'}</div>,
    },
    {
        accessorKey: 'is_hero',
        header: 'Hero',
        cell: ({ row }) => <div className="">{row.getValue('is_hero') ? 'Yes' : 'No'}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const param = { product: row.original.id };

            return <DataTableActions routePrefix="products" routeParam={param} />;
        },
    },
];

export default function ProductIndex({ products }: { products: Product[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row justify-between">
                    <CreateBtn route={route('products.create')} />
                    {/* <ExportBtn route={route('products.export')} /> */}
                </div>
                <DataTable data={products} columns={columns} />
            </div>
        </AppLayout>
    );
}
