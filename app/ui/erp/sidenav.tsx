import Link from 'next/link';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'

import {
    ChevronDownIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline'
import NavBotones from './nav-botones';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function SideNav({ navigation }: any) {
    return (
        <>
            <div className="flex flex-col w-64">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-grow bg-gray-900 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Workflow" />
                    </div>
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        <NavBotones navigation={navigation}/>
                    </nav>

                </div>
            </div >
        </>
    );
}
