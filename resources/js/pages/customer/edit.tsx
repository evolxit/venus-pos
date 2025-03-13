import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Dummy interface
// Update your types file and import from it
type Customer = {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    prepaid_balance: string;
    is_active: boolean;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer',
        href: route('customers.index'),
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function CustomerEdit({ customer }: { customer: Customer }) {
    const { data, setData, patch, reset, errors, processing } = useForm<Customer>({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        prepaid_balance: customer.prepaid_balance,
        is_active: customer.is_active,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('customers.update', { customer: customer.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit - Customer" />
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
                                placeholder="Moe Moe"
                                autoFocus={true}
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="customer@example.com"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="+959 12345 6789" />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Hlaing Township, Yangon, Myanmar"
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>
                        <div className="grid grid-flow-row gap-2">
                            <Label htmlFor="prepaid_balance">Prepaid Balance</Label>
                            <Input
                                id="prepaid_balance"
                                value={data.prepaid_balance}
                                onChange={(e) => setData('prepaid_balance', e.target.value)}
                                placeholder="0"
                            />
                            <InputError className="mt-2" message={errors.prepaid_balance} />
                        </div>
                        <div className="space-x-2">
                            <Switch id="is_active" checked={data.is_active} onCheckedChange={() => setData('is_active', !data.is_active)} />
                            <Label htmlFor="is_active">Active Customer</Label>
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
