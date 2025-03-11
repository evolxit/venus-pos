import Heading from '@/components/heading';
import HeroSlider from '@/components/sliders/hero-slider';
import ShopLayout from '@/layouts/shop-layout';
import { products, sliderProducts } from '@/lib/dummy-data';
import { Head } from '@inertiajs/react';

export default function ShopIndex() {
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
                        <div key={index} className="space-y-2 text-center">
                            <img src={product.image} />
                            <h2>{product.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </ShopLayout>
    );
}
