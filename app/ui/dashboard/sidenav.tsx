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
                        {navigation.map((item: any) => (
                            item.optiones.length > 0 ? (
                                <Disclosure as="div" className="w-full">
                                    {({ open }) => (
                                        <>
                                            <DisclosureButton key={item.name}
                                                className={
                                                    classNames(
                                                        item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full'
                                                    )}>
                                                {open ? (
                                                    <ChevronDownIcon className="mr-3 h-6 w-6 text-gray-400" aria-hidden="true" />
                                                ) : (
                                                    <ChevronRightIcon className="mr-3 h-6 w-6 text-gray-400" aria-hidden="true" />
                                                )}
                                                <span className="font-medium text-white">{item.name}</span>
                                            </DisclosureButton>
                                            <DisclosurePanel className="    ">
                                                <div className="">
                                                    {item.optiones.map((option: any, optionIdx: any) => (
                                                        <Link
                                                            key={option.name}
                                                            href={option.href}
                                                            className={
                                                                classNames(
                                                                    option.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md pl-9'
                                                                )}
                                                        >
                                                            <option.icon className="mr-3 h-6 w-6 text-gray-400" aria-hidden="true" />
                                                            {option.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={
                                        classNames(
                                            item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                >
                                    <item.icon className="mr-3 h-6 w-6 text-gray-400" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </nav>

                </div>
            </div >
        </>
    );
}
