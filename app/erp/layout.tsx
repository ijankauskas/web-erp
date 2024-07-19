'use client'

import { useState } from 'react';
import SideNavMobile from '../ui/erp/sidenav-mobile';
import SideNav from '../ui/erp/sidenav';
import NavBar from '../ui/erp/navBar';

import {
    HomeIcon,
    ChevronDownIcon,
    UserPlusIcon,
    PlusCircleIcon,
    ShoppingCartIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline'

const navigation = [
    {
        name: 'Dashboard',
        href: '/erp',
        current: true,
        icon: HomeIcon,
        optiones: []
    },
    {
        name: 'Altas',
        href: '',
        current: false,
        icon: ChevronDownIcon,
        optiones: [
            {
                name: 'Articulos',
                href: '/erp/alta_articulo',
                current: false,
                icon: PlusCircleIcon,
            },
            {
                name: 'Clientes',
                href: '/alta_articulo',
                current: false,
                icon: UserPlusIcon,
            },
            {
                name: 'Proveedores',
                href: '/erp/alta_proveedor',
                current: false,
                icon: UserPlusIcon,
            }
        ]
    },
    {
        name: 'Operaciones',
        href: '',
        current: false,
        icon: ChevronDownIcon,
        optiones: [
            {
                name: 'Ventas',
                href: '/erp/venta',
                current: false,
                icon: ShoppingBagIcon,
            },
            {
                name: 'Compras',
                href: '/erp/compra',
                current: false,
                icon: ShoppingCartIcon,
            }
        ]
    },
    {
        name: 'Consultas',
        href: '/erp/consultas',
        current: true,
        icon: HomeIcon,
        optiones: [
            {
                name: 'Ventas',
                href: '/erp/venta',
                current: false,
                icon: ShoppingBagIcon,
            },
            {
                name: 'Compras',
                href: '/erp/compras',
                current: false,
                icon: ShoppingCartIcon,
            }]
    },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSideBar = () => {
        setSidebarOpen(!sidebarOpen);
    };


    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <SideNavMobile navigation={navigation} sidebarOpen={sidebarOpen} toggleSideBar={toggleSideBar} />

            <div className="hidden lg:flex lg:flex-shrink-0">
                <SideNav navigation={navigation} />
            </div>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <main className="flex-1 w-full relative z-0 overflow-y-auto focus:outline-none">
                    <NavBar toggleSideBar={toggleSideBar} />
                    {children}
                </main>
            </div>
        </div>
    );
}
