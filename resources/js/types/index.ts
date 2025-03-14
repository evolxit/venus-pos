import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    is_impersonating: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export type Option = {
    value: string | number;
    label: string;
};

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface Todo {
    id: number;
    name: string;
    content: string;
    status: string;
    creator_id: number;
    completed_at?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    creator: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    is_super_admin: boolean;
    main_role: string;
    can_do: string[];
    [key: string]: unknown; // This allows for additional properties...
}

export type Product = {
    id: number;
    handle: string;
    title: string;
    description: string;
    image: string;
    start_price_mmk: number;
};

export type Brand = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};

export type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    prepaid_balance: number;
};

export type InvoiceProduct = {
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
