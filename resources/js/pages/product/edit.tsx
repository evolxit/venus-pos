import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Dummy interface
// Update your types file and import from it
type Product = {
    id?: number;
    name: string;
    description: string;
    image: string;
    color: string[] | undefined;
    size: string[] | undefined;
    is_active: boolean;
    is_featured: boolean;
    is_hero: boolean;
    start_price_mmk: number;
    start_price_sgd: number;
    brand_id: number | undefined;
    category_id: number | undefined;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: route('products.index'),
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function ProductEdit({ product }: { product: Product }) {
    const { data, setData, patch, reset, errors, processing } = useForm<Product>({
        name: product.name,
        description: product.description,
        image: product.image,
        color: product.color,
        size: product.size,
        is_active: product.is_active,
        is_featured: product.is_featured,
        is_hero: product.is_hero,
        start_price_mmk: product.start_price_mmk,
        start_price_sgd: product.start_price_sgd,
        brand_id: product.brand_id,
        category_id: product.category_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('products.update', { product: product.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create - Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit} className="md:max-w-xl">
                    <div className="space-y-6">
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="name">Name*</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="enter product name"
                                autoFocus={true}
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="description">Description*</Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                                placeholder="enter description"
                            />
                            <InputError className="mt-2" message={errors.description} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="color">Color*</Label>
                            <Input
                                id="color"
                                value={data.color}
                                onChange={(e) => setData('color', e.target.value.split(/[ ,]+/))}
                                required
                                placeholder="enter comma separated color values"
                            />
                            <InputError className="mt-2" message={errors.color} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="size">Size*</Label>
                            <Input
                                id="size"
                                value={data.size}
                                onChange={(e) => setData('size', e.target.value.split(/[ ,]+/))}
                                required
                                placeholder="enter comma separated size values"
                            />
                            <InputError className="mt-2" message={errors.size} />
                        </div>
                        <div className="grid grid-flow-col gap-2">
                            <Switch id="is_active" checked={data.is_active} onCheckedChange={() => setData('is_active', !data.is_active)} />
                            <Label htmlFor="is_active">Show Product</Label>
                        </div>
                        <div className="grid grid-flow-col gap-2">
                            <Switch id="is_featured" checked={data.is_featured} onCheckedChange={() => setData('is_featured', !data.is_featured)} />
                            <Label htmlFor="is_active">Featured Product</Label>
                        </div>
                        <div className="grid grid-flow-col gap-2">
                            <Switch id="is_hero" checked={data.is_hero} onCheckedChange={() => setData('is_hero', !data.is_hero)} />
                            <Label htmlFor="is_hero">Hero Slider</Label>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button variant="secondary" type="reset" disabled={processing}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
