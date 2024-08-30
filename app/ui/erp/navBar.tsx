'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, ChevronDownIcon, CurrencyDollarIcon, PlusCircleIcon, ShoppingBagIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Transition } from '@headlessui/react';


import { Popover, } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


const menus = [
    {
        nombre: "Altas",
        subMenu: [
            {
                nombre: "Stock",
                pantallas: [
                    {
                        nombre: "Articulos",
                        href: '/erp/alta_articulo',
                        current: false,
                        icon: PlusCircleIcon,
                    },
                    {
                        nombre: "Depositos",
                        href: '/erp/alta_articulo',
                        current: false,
                        icon: PlusCircleIcon,
                    },

                ]
            },
            {
                nombre: "Ventas",
                pantallas: [
                    {
                        nombre: "Clientes",
                        href: '/erp/alta_cliente',
                        current: false,
                        icon: UserPlusIcon,
                    },
                    {
                        nombre: "Lista de Precios",
                        href: '/erp/alta_cliente',
                        current: false,
                        icon: UserPlusIcon,
                    },

                ]
            },
            {
                nombre: "Proveedores",
                pantallas: [
                    {
                        nombre: 'Proveedores',
                        href: '/erp/alta_proveedor',
                        current: false,
                        icon: UserPlusIcon,
                    },
                    {
                        nombre: "Lista de Precios",
                        href: '/erp/alta_proveedor',
                        current: false,
                        icon: UserPlusIcon,
                    },

                ]
            }
        ]
    },
    {
        nombre: "Operaciones",
        subMenu: [
            {
                nombre: "Ventas",
                pantallas: [
                    {
                        nombre: "Facturas",
                        href: '/erp/venta',
                        current: false,
                        icon: ShoppingBagIcon,
                    }
                ]
            }
        ]
    },
    {
        nombre: "Consultas",
        subMenu: [
            {
                nombre: "Ventas",
                pantallas: [
                    {
                        nombre: "Saldo de clientes",
                        href: '/erp/saldos',
                        current: false,
                        icon: CurrencyDollarIcon,
                    }
                ]
            }
        ]
    }
]

export default function NavBar({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <Disclosure as="nav" className="fixed top-0 w-full bg-gray-800 z-50">
                    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {menus.map((menu: any, index: any) => (
                                            <Menu key={index} as="div" className="relative inline-block text-left">
                                                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-gray-300 shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700">
                                                    {menu.nombre}
                                                    <ChevronDownIcon className="h-4 w-4 text-white/60" />
                                                </MenuButton>
                                                <Transition
                                                    as="div"
                                                >
                                                    <Menu.Items className="absolute z-20 left-0 mt-0.5 w-64 origin-top-left rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {menu.subMenu.map((subMenu: any, subIndex: any) => (
                                                            <div key={subIndex} className="relative">
                                                                <Popover className="relative">
                                                                    <Popover.Button className="w-full flex justify-between rounded-lg p-2 items-center gap-x-1 text-sm font-semibold leading-6 text-black hover:bg-gray-200">
                                                                        {subMenu.nombre}
                                                                        <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                                                                    </Popover.Button>

                                                                    <Popover.Panel className="absolute left-full top-0 ml-0.5 w-64 origin-top-left rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5">
                                                                        <div className="py-1.5">
                                                                            {subMenu.pantallas.map((item: any, indexPantalla: any) => (
                                                                                <div key={indexPantalla} className="text-sm font-semibold group relative flex items-center gap-x-6 rounded-lg p-2 text-black hover:bg-gray-200">
                                                                                    <div className="mt-1 flex h-5 w-8 flex-none items-center justify-center rounded-lg">
                                                                                        <item.icon className="mr-3 text-gray-400" aria-hidden="true" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <Link
                                                                                            key={indexPantalla}
                                                                                            href={item.href}
                                                                                        >
                                                                                            {item.nombre}
                                                                                            <span className="absolute inset-0" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </Popover.Panel>
                                                                </Popover>
                                                            </div>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            {userNavigation.map((item) => (
                                                <MenuItem key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                </div>
                                <button
                                    type="button"
                                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>

                {/* <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header> */}
                {/* <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
                </main> */}
            </div>
        </>
    )
}
