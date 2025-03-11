import AppLogoIcon from '@/components/app-logo-icon';
import ShopSearchbox from '@/layouts/shop/shop-searchbox';

export default function ShopHeader() {
    return (
        <header>
            <div className="container">
                <div className="flex h-16 justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <a className="" href="#">
                            <span className="sr-only">Home</span>
                            <AppLogoIcon />
                        </a>
                    </div>

                    <div className="flex items-center justify-center">
                        <ShopSearchbox />
                    </div>
                </div>
            </div>
        </header>
    );
}
