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
type Category = {
    id?: number;
    name: string;
    created_at?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: route('categories.index'),
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function CategoryShow({ category, isDelete }: { category: Category; isDelete: boolean }) {
    const [openDelete, setOpenDelete] = React.useState(isDelete);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail - Category" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="md:max-w-xl">
                    <CardHeader>
                        <CardTitle>Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                            <DetailListText label="name" value={category.name} />
                            <DetailListText label="created at" value={category.created_at} />
                        </dl>
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                        <EditBtn
                            route={route('categories.edit', {
                                category: category,
                            })}
                        />
                        <DeleteBtn
                            route={route('categories.destroy', {
                                category: category,
                            })}
                            item={category.name}
                            open={openDelete}
                            setOpen={setOpenDelete}
                        />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
