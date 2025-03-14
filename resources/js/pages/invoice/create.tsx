import InputError from '@/components/input-error';
import DatePicker from '@/components/inputs/date-picker';
import SimpleSelect from '@/components/inputs/simple-select';
import SmartSelect from '@/components/inputs/smart-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Brand, Customer, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Dummy interface
// Update your types file and import from it
type Invoice = {
    invoice_no: string;
    order_date: Date | undefined;
    customer_id: number | undefined;
    customer_phone: string;
    customer_address: string;
    payment_method: string;
    status: string;
    shipping_date: Date | undefined;
    est_arrival_date: Date | undefined;
    region_delivery_fee: number;
    remarks: string;
    total_amount: number;
    deposit_paid: number;
    remaining_amount: number;
    customer: Customer | undefined;
    invoiceProducts: InvoiceProduct[];
};

type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    start_price_mmk: number;
};

type InvoiceProduct = {
    id: number | undefined;
    type: string;
    size: string;
    qty: number;
    unit_selling_price: number;
    unit_total: number;
    remarks: string;
    product: Product;
    brand?: Brand;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice',
        href: route('invoices.index'),
    },
    {
        title: 'Create',
        href: '#',
    },
];

export default function InvoiceCreate({ customers, products, statuses }: { customers: Customer[]; products: Product[]; statuses: string[] }) {
    const { data, setData, post, reset, errors, processing } = useForm<Invoice>({
        invoice_no: '',
        order_date: undefined,
        customer_id: undefined,
        customer_phone: '',
        customer_address: '',
        payment_method: '',
        status: '',
        shipping_date: undefined,
        est_arrival_date: undefined,
        region_delivery_fee: 0,
        remarks: '',
        customer: undefined,
        total_amount: 0,
        deposit_paid: 0,
        remaining_amount: 0,
        invoiceProducts: [],
    });

    const customerOptions = customers.map((customer) => ({
        value: customer.id, // Assuming the customer has an `id` field
        label: customer.name, // Assuming the customer has a `name` field
    }));

    const addProductRow = () => {
        const newProduct: InvoiceProduct = {
            id: undefined,
            product: products[0],
            qty: 1,
            unit_selling_price: products[0].start_price_mmk,
            unit_total: products[0].start_price_mmk,
            remarks: '',
            type: '',
            size: '',
        };
        setData('invoiceProducts', [...data.invoiceProducts, newProduct]);
    };

    const updateProduct = <K extends keyof InvoiceProduct>(index: number, field: K, value: InvoiceProduct[K]) => {
        const updatedProducts = [...data.invoiceProducts];
        const product = updatedProducts[index];

        // Safely assign the value
        product[field] = value;

        if (field === 'qty' || field === 'unit_selling_price') {
            product.unit_total = product.qty * product.unit_selling_price;
        }

        setData('invoiceProducts', updatedProducts);
    };

    const removeProductRow = (index: number) => {
        const updatedProducts = data.invoiceProducts.filter((_, i) => i !== index);
        setData('invoiceProducts', updatedProducts);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invoices.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create - Invoice" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit} className="">
                    <div className="mt-5 space-y-6">
                        <div className="grid grid-cols-3 gap-1">
                            <div className="grid grid-flow-row gap-1">
                                <Label htmlFor="invoice_no">Invoice Number*</Label>
                                <Input
                                    id="invoice_no"
                                    value={data.invoice_no}
                                    onChange={(e) => setData('invoice_no', e.target.value)}
                                    required
                                    placeholder="SGxxxxxxxxxx"
                                    autoFocus={true}
                                />
                                <InputError className="mt-2" message={errors.invoice_no} />
                            </div>
                            <div className="grid grid-flow-row gap-1">
                                <Label htmlFor="customer">Customer</Label>
                                <SmartSelect
                                    options={customerOptions}
                                    item={data.customer ? { value: data.customer.id, label: data.customer.name } : undefined}
                                    setItem={(option) => {
                                        if (option) {
                                            const selectedCustomer = customers.find((c) => c.id === option.value);
                                            if (selectedCustomer) {
                                                setData('customer', selectedCustomer);
                                                setData('customer_phone', selectedCustomer.phone || '');
                                                setData('customer_address', selectedCustomer.address || '');
                                                setData('region_delivery_fee', 1000); // Assuming the region delivery fee is 1000
                                            }
                                        } else {
                                            // Reset when option is cleared
                                            setData('customer', undefined);
                                            setData('customer_phone', '');
                                            setData('customer_address', '');
                                            setData('region_delivery_fee', 0);
                                        }
                                    }}
                                />
                                <InputError className="mt-2" message={errors.customer} />
                            </div>
                            <div className="grid grid-flow-row gap-1">
                                <Label htmlFor="order_date">Order Date</Label>
                                <div className="w-full">
                                    <DatePicker date={data.order_date} setDate={(date) => setData('order_date', date)} />
                                </div>

                                <InputError className="mt-2" message={errors.order_date} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                            <div className="col-span-1 grid grid-flow-row gap-1">
                                <Label htmlFor="invoice_no">Phone</Label>
                                <Input
                                    id="customer_phone"
                                    value={data.customer_phone}
                                    onChange={(e) => setData('customer_phone', e.target.value)}
                                    required
                                    placeholder="09xxxxxxxxx"
                                />
                                <InputError className="mt-2" message={errors.customer_phone} />
                            </div>
                            <div className="col-span-2 grid grid-flow-row gap-1">
                                <Label htmlFor="customer_address">Address</Label>
                                <Input
                                    id="customer_address"
                                    value={data.customer_address}
                                    onChange={(e) => setData('customer_address', e.target.value)}
                                    required
                                    placeholder="Enter customer address"
                                />
                                <InputError className="mt-2" message={errors.customer_address} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                            <div className="grid grid-flow-row gap-1">
                                <Label htmlFor="shipping_date">Shipped Date</Label>
                                <div className="w-full">
                                    <DatePicker date={data.shipping_date} setDate={(date) => setData('shipping_date', date)} />
                                </div>

                                <InputError className="mt-2" message={errors.shipping_date} />
                            </div>
                            <div className="grid grid-flow-row gap-1">
                                <Label htmlFor="est_arrival_date">Estimated Arrival</Label>
                                <div className="w-full">
                                    <DatePicker date={data.est_arrival_date} setDate={(date) => setData('est_arrival_date', date)} />
                                </div>

                                <InputError className="mt-2" message={errors.est_arrival_date} />
                            </div>
                            <div className="grid grid-flow-row gap-1">
                                <Label htmlFor="region_delivery_fee">Region Deli Fee</Label>
                                <Input id="invoice_no" type="number" value={data.region_delivery_fee} readOnly />
                                <InputError className="mt-2" message={errors.invoice_no} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 space-y-6">
                        <div className="grid grid-cols-3 gap-1">
                            <div className="col-span-1 grid grid-flow-row gap-1">
                                <Label htmlFor="status">Status</Label>
                                <SimpleSelect options={statuses} item={data.status} setItem={(v) => setData('status', v)} />
                                <InputError className="mt-2" message={errors.customer} />
                            </div>
                            <div className="col-span-2 grid grid-flow-row gap-1">
                                <Label htmlFor="remarks">Remarks</Label>
                                <Input
                                    id="remarks"
                                    value={data.remarks}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                    required
                                    placeholder="Enter remarks (optional)"
                                />
                                <InputError className="mt-2" message={errors.remarks} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 space-y-6">
                        <Button type="button" onClick={addProductRow}>
                            Add Product
                        </Button>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Product Description
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Type
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Size
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Unit Price
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Qty
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Unit Total
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3"></th> {/* Empty header for Remove button */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data.invoiceProducts.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-1 py-4 whitespace-nowrap">
                                                <select
                                                    value={item.product.id}
                                                    onChange={(e) => {
                                                        const product = products.find((p) => p.id === parseInt(e.target.value));
                                                        if (product) {
                                                            updateProduct(index, 'product', product);
                                                            updateProduct(index, 'unit_selling_price', product.start_price_mmk);
                                                            updateProduct(index, 'unit_total', product.start_price_mmk * item.qty);
                                                        }
                                                    }}
                                                    className="rounded border px-2 py-1"
                                                >
                                                    {products.map((product) => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-1 py-4 whitespace-nowrap">
                                                <Input
                                                    value={item.type}
                                                    onChange={(e) => {
                                                        updateProduct(index, 'type', e.target.value);
                                                    }}
                                                    className="w-20 rounded border px-2 py-1"
                                                />
                                            </td>
                                            <td className="px-1 py-4 whitespace-nowrap">
                                                <Input
                                                    value={item.size}
                                                    onChange={(e) => {
                                                        updateProduct(index, 'size', e.target.value);
                                                    }}
                                                    className="w-20 rounded border px-2 py-1"
                                                />
                                            </td>
                                            <td className="px-1 py-4 whitespace-nowrap">
                                                <Input
                                                    type="number"
                                                    value={item.unit_selling_price}
                                                    onChange={(e) => {
                                                        updateProduct(index, 'unit_selling_price', parseFloat(e.target.value));
                                                        updateProduct(index, 'unit_total', parseFloat(e.target.value) * item.qty);
                                                    }}
                                                    className="w-20 rounded border px-2 py-1"
                                                />
                                            </td>
                                            <td className="px-1 py-4 whitespace-nowrap">
                                                <Input
                                                    type="number"
                                                    value={item.qty}
                                                    onChange={(e) => {
                                                        updateProduct(index, 'qty', parseInt(e.target.value));
                                                        updateProduct(index, 'unit_total', item.unit_selling_price * parseInt(e.target.value));
                                                    }}
                                                    className="w-20 rounded border px-2 py-1"
                                                />
                                            </td>
                                            <td className="px-1 py-4 whitespace-nowrap">
                                                <Input type="number" value={item.unit_total} readOnly className="w-20 rounded border px-2 py-1" />
                                            </td>
                                            <td className="px-1 py-4 text-right whitespace-nowrap">
                                                <Button type="button" onClick={() => removeProductRow(index)}>
                                                    X
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-5 space-y-6">
                        <div className="grid grid-cols-3 gap-1">
                            <div></div>
                            <div></div>
                            <div className="col-span-1 grid grid-flow-row gap-1">
                                <Label htmlFor="deposit_paid">Deposit Paid</Label>
                                <Input
                                    type="number"
                                    id="deposit_paid"
                                    value={data.deposit_paid}
                                    onChange={(e) => setData('deposit_paid', parseFloat(e.target.value))}
                                    required
                                />
                                <InputError className="mt-2" message={errors.deposit_paid} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 space-y-6">
                        <div className="flex justify-start gap-4">
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
