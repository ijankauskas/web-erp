import Link from 'next/link';
import NavLinks from '@/app/ui/erp/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


export default function navBar({ toggleSideBar }: any) {

    return (
        <div className="flex items-center justify-between bg-white shadow-sm ring-1 ring-inset ring-gray-300 px-4 py-1 h-[6vh] z-50 ">
            <div>
                <button 
                    className="px-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                    onClick={toggleSideBar}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className='w-10/12'>
                <form action="">
                    <input type="text" 
                        placeholder='Buscar...'/>
                </form>
            </div>
            <div>
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Workflow" />
            </div>
        </div>
    )
}