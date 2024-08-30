'use client'

import { Menu, MenuButton, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
} from '@heroicons/react/20/solid';

import { Popover, } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline';


const menus = [
  {
    nombre: "Altas",
    subMenu: [
      {
        nombre: "Stock",
        pantallas: [
          {
            nombre: "Articulos"
          },
          {
            nombre: "Depositos"
          },

        ]
      },
      {
        nombre: "Ventas",
        pantallas: [
          {
            nombre: "Clientes"
          },
          {
            nombre: "Lista de Precios"
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
          },
          {
            nombre: "Pedidos",
          }
        ]
      }
    ]
  }
]

export default function Test() {
  return (
    <div className="fixed top-24 w-52 text-right flex items-end">
      {menus.map((menu: any, index: any) => (
        <Menu key={index} as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700">
            {menu.nombre}
            <ChevronDownIcon className="h-4 w-4 text-white/60" />
          </MenuButton>
          <Transition
            as="div"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 mt-0.5 w-64 origin-top-left rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {menu.subMenu.map((subMenu: any, subIndex: any) => (
                <div key={subIndex} className="relative">
                  <Popover className="relative">
                    <Popover.Button className="w-full flex justify-between rounded-lg p-2 items-center gap-x-1 text-sm font-semibold leading-6 text-white hover:bg-gray-700">
                      {subMenu.nombre}
                      <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                    </Popover.Button>

                    <Popover.Panel className="absolute left-full top-0 ml-0.5 w-64 origin-top-left rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1.5">
                        {subMenu.pantallas.map((item: any, indexPantalla: any) => (
                          <div key={indexPantalla} className="group relative flex items-center gap-x-6 rounded-lg p-2 hover:bg-gray-700">
                            <div className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-lg">
                              {/* Aquí es donde podrías incluir un ícono si estuviera definido */}
                            </div>
                            <div>
                              <a className="font-semibold text-white">
                                {item.nombre}
                                <span className="absolute inset-0" />
                              </a>
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
  );
}
