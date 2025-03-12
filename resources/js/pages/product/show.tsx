import { DeleteBtn } from '@/components/buttons/delete-btn';
import { EditBtn } from '@/components/buttons/edit-btn';
import { DetailListImage } from '@/components/common/detail-list-image';
import { DetailListText } from '@/components/common/detail-list-text';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Brand, BreadcrumbItem, Category } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

// Dummy interface
// Update your types file and import from it
type Product = {
    id?: number;
    name: string;
    description: string;
    image: string;
    color: string[];
    size: string[];
    is_active: boolean;
    is_featured: boolean;
    is_hero: boolean;
    start_price_mmk: number;
    start_price_sgd: number;
    brand: Brand;
    category: Category;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: route('products.index'),
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function ProductShow({ product, isDelete }: { product: Product; isDelete: boolean }) {
    const [openDelete, setOpenDelete] = React.useState(isDelete);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail - Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="md:max-w-xl">
                    <CardHeader>
                        <CardTitle>Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                            <DetailListText label="name" value={product.name} />
                            <DetailListText label="description" value={product.description} />
                            <DetailListText label="brand" value={product.brand.name} />
                            <DetailListText label="category" value={product.category.name} />
                            <DetailListImage label="image" value="https://placeholder.pics/svg/300" />
                            <DetailListText label="color" value={product.color.join(', ')} />
                            <DetailListText label="size" value={product.size.join(', ')} />
                            <DetailListText label="show product" value={product.is_active ? 'Yes' : 'No'} />
                            <DetailListText label="featured product" value={product.is_featured ? 'Yes' : 'No'} />
                            <DetailListText label="hero slider" value={product.is_hero ? 'Yes' : 'No'} />
                            <DetailListText label="start price (MMK)" value={product.start_price_mmk} />
                            <DetailListText label="start price (SGD)" value={product.start_price_sgd} />
                        </dl>
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                        <EditBtn
                            route={route('products.edit', {
                                product: product,
                            })}
                        />
                        <DeleteBtn
                            route={route('products.destroy', {
                                product: product,
                            })}
                            item={product.name}
                            open={openDelete}
                            setOpen={setOpenDelete}
                        />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
