import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ShopSearchbox() {
    return (
        <form className="flex flex-row gap-2">
            <Input placeholder="search product by name" />
            <Button>Search</Button>
        </form>
    );
}
