import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BadgeDollarSign,
    BookmarkIcon,
    BookOpen,
    Box,
    Folder,
    LayoutGrid,
    ListCheck,
    ListOrdered,
    Shield,
    StarIcon,
    TerminalSquare,
    UserCog,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: route('dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Invoices',
        url: route('invoices.index'),
        icon: ListOrdered,
    },
    {
        title: 'Payments',
        url: '#',
        icon: BadgeDollarSign,
    },
    {
        title: 'Customers',
        url: route('customers.index'),
        icon: UserCog,
    },
    {
        title: 'Products',
        url: route('products.index'),
        icon: Box,
    },
    {
        title: 'Category',
        url: route('categories.index'),
        icon: BookmarkIcon,
    },
    {
        title: 'Brands',
        url: route('brands.index'),
        icon: StarIcon,
    },
    {
        title: 'Users',
        url: route('users.index'),
        icon: Users,
    },
    {
        title: 'Roles',
        url: route('roles.index'),
        icon: Shield,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Playground',
        url: route('playground'),
        icon: TerminalSquare,
    },
    {
        title: 'To Dos',
        url: route('todos.index'),
        icon: ListCheck,
    },
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
