'use client'

import { useEffect, useState } from 'react';
import SideNav from '../ui/erp/sidenav';
import { AdjustmentsVerticalIcon, ArchiveBoxIcon, BanknotesIcon, CurrencyDollarIcon, FolderIcon, PlusCircleIcon, PlusIcon, ShoppingBagIcon, SquaresPlusIcon, UserPlusIcon } from '@heroicons/react/24/outline'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

const menus = [
    {
        nombre: "Altas",
        icon: PlusCircleIcon,
        subMenu: [
            {
                nombre: "Generales",
                icon: AdjustmentsVerticalIcon,
                pantallas: [
                    {
                        nombre: "Comprobantes",
                        href: '/erp/alta/comprobantes',
                        current: false,
                        icon: UserPlusIcon,
                    },


                ]
            },
            {
                nombre: "Stock",
                icon: ArchiveBoxIcon,
                pantallas: [
                    {
                        nombre: "Articulos",
                        href: '/erp/alta/articulo',
                        current: false,
                        icon: PlusCircleIcon,
                    },
                    {
                        nombre: "Depositos",
                        href: '/erp/alta/depositos',
                        current: false,
                        icon: PlusCircleIcon,
                    },
                    {
                        nombre: "Depositos2222",
                        href: '/erp/alta/articulo',
                        current: false,
                        icon: PlusCircleIcon,
                    },

                ]
            },
            {
                nombre: "Ventas",
                icon: BanknotesIcon,
                pantallas: [
                    {
                        nombre: "Clientes",
                        href: '/erp/alta/cliente',
                        current: false,
                        icon: UserPlusIcon,
                    },
                    {
                        nombre: "Lista de Precios",
                        href: '/erp/alta/listaprecios',
                        current: false,
                        icon: UserPlusIcon,
                    },
                    {
                        nombre: "Vendedores",
                        href: '/erp/alta/vendedores',
                        current: false,
                        icon: UserPlusIcon,
                    },

                ]
            },
            {
                nombre: "Proveedores",
                icon: ShoppingBagIcon,
                pantallas: [
                    {
                        nombre: 'Proveedores',
                        href: '/erp/alta/proveedor',
                        current: false,
                        icon: UserPlusIcon,
                    },
                    {
                        nombre: "Lista de Precios",
                        href: '/erp/alta/proveedor',
                        current: false,
                        icon: UserPlusIcon,
                    },

                ]
            }
        ]
    },
    {
        nombre: "Operaciones",
        icon: SquaresPlusIcon,
        subMenu: [
            {
                nombre: "Ventas",
                icon: BanknotesIcon,
                pantallas: [
                    {
                        nombre: "Facturas",
                        href: '/erp/operaciones/venta',
                        current: false,
                        icon: ShoppingBagIcon,
                    },
                    {
                        nombre: "Recibos",
                        href: '/erp/operaciones/recibo',
                        current: false,
                        icon: ShoppingBagIcon,
                    },
                    {
                        nombre: "Remitos",
                        href: '/erp/operaciones/remito',
                        current: false,
                        icon: ShoppingBagIcon,
                    },
                    {
                        nombre: "Nota de Credito",
                        href: '/erp/operaciones/nota_credito',
                        current: false,
                        icon: ShoppingBagIcon,
                    }
                ]
            }
        ]
    },
    {
        nombre: "Consultas",
        icon: FolderIcon,
        subMenu: [
            {
                nombre: "Ventas",
                icon: UserPlusIcon,
                pantallas: [
                    {
                        nombre: "Saldo de clientes",
                        href: '/erp/consultas/saldos_cliente',
                        current: false,
                        icon: CurrencyDollarIcon,
                    }
                ]
            }
        ]
    },
    {
        nombre: "Afip",
        icon: PlusIcon,
        subMenu: [],
        href: '/erp/afip',
    }
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const { user } = useUser()   
    const [loading, setLoagin] = useState(false);

    const toggleSideBar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // useEffect(() => {
    //     cargarUsuario()
    // }, [])

    // const cargarUsuario = async () => {
    //     setLoagin(true)
    //     const checkUserLoaded = async () => {
    //         while (!user) {  // Asume que user proviene de useUser() o similar
    //             await new Promise(resolve => setTimeout(resolve, 100)); // Espera 100ms antes de verificar de nuevo
    //         }
    //     };

    //     await checkUserLoaded();
    //     setLoagin(false)
    // }

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            <div className="flex w-0 flex-1 overflow-hidden">
                {/* <NavBar /> */}
                <SideNav navigation={menus} />
                <main className="flex-1 w-full relative z-0 overflow-y-auto focus:outline-none">
                    {/* <NavBar toggleSideBar={toggleSideBar} /> */}
                    {children}
                </main>
            </div>
        </div>
    );
}
