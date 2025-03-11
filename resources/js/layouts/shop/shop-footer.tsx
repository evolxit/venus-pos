import AppLogoIcon from '@/components/app-logo-icon';

export default function ShopFooter() {
    return (
        <footer className="bg-muted">
            <div className="container py-10">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center sm:justify-start">
                        <AppLogoIcon />
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">Copyright &copy; 2025. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
