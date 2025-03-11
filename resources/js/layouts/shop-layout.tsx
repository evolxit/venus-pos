import ShopFooter from '@/layouts/shop/shop-footer';
import ShopHeader from '@/layouts/shop/shop-header';
import React from 'react';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <ShopHeader />
            <main className="container my-10">{children}</main>
            <ShopFooter />
        </React.Fragment>
    );
}
