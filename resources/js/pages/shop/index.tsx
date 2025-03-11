import Heading from '@/components/heading';
import HeroSlider from '@/components/sliders/hero-slider';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import ShopLayout from '@/layouts/shop-layout';
import { products, sliderProducts } from '@/lib/dummy-data';
import { Product } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function ShopIndex() {
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState<Product | null>(null);

    const handleProduct = (product: Product) => {
        setProduct(product);
        setOpen(true);
    };
    return (
        <ShopLayout>
            <Head title="Shop" />
            <div className="bg-gradient rounded-md py-10">
                <HeroSlider products={sliderProducts} />
            </div>
            <div className="container">
                <div className="mt-10 mb-6 text-center">
                    <Heading title="Featured Products" description="Explore Today's Featured Picks!" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {products.map((product, index) => (
                        <div key={index} className="cursor-pointer space-y-2 text-center" onClick={() => handleProduct(product)}>
                            <img src={product.image} />
                            <h2>{product.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <Drawer open={open} onOpenChange={setOpen} direction="right">
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{product?.title}</DrawerTitle>
                        <DrawerDescription>{product?.description}</DrawerDescription>
                    </DrawerHeader>
                    <div className="space-y-2 px-4">
                        <img src={product?.image} alt="" />
                        <p>
                            <strong>Colors</strong>: Yellow, Blue, Green
                        </p>
                        <p>
                            <strong>Sizes</strong>: Small, Medium, Large
                        </p>
                    </div>
                </DrawerContent>
            </Drawer>
        </ShopLayout>
    );
}
