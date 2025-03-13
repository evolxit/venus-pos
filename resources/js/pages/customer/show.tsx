import { DeleteBtn } from '@/components/buttons/delete-btn';
import { EditBtn } from '@/components/buttons/edit-btn';
import { DetailListText } from '@/components/common/detail-list-text';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

// Dummy interface
// Update your types file and import from it
type Customer = {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    prepaid_balance: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer',
        href: route('customers.index'),
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function CustomerShow({ customer, isDelete }: { customer: Customer; isDelete: boolean }) {
    const [openDelete, setOpenDelete] = React.useState(isDelete);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail - Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="md:max-w-xl">
                    <CardHeader>
                        <CardTitle>Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                            <DetailListText label="name" value={customer.name} />
                            <DetailListText label="email" value={customer.email} />
                            <DetailListText label="phone" value={customer.phone} />
                            <DetailListText label="address" value={customer.address} />
                            <DetailListText label="prepaid balance" value={customer.prepaid_balance + ' Ks'} />
                            <DetailListText label="Is Active" value={customer.is_active ? 'Yes' : 'No'} />
                            <DetailListText label="created at" value={customer.created_at} />
                            <DetailListText label="updated at" value={customer.created_at} />
                        </dl>
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                        <EditBtn
                            route={route('customers.edit', {
                                customer: customer,
                            })}
                        />
                        <DeleteBtn
                            route={route('customers.destroy', {
                                customer: customer,
                            })}
                            item={customer.name}
                            open={openDelete}
                            setOpen={setOpenDelete}
                        />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
