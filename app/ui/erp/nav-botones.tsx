import Link from 'next/link';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
} from '@headlessui/react'

import {
    ChevronDownIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline'
import { SignOut } from './SingOut';
import { Tooltip } from '@nextui-org/react';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBotones({ navigation }: any) {
    return (
        <>
            {navigation.map((item: any, index: number) => (
                item.subMenu.length > 0 ? (
                    <Disclosure as="div" className="w-full" key={index}>
                        {({ open }) => (
                            <>
                                <DisclosureButton key={index}
                                    className={
                                        classNames(
                                            item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md w-full '
                                        )}>
                                    <span className="font-medium text-white">{item.nombre}</span>
                                    {open ? (
                                        <ChevronDownIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    ) : (
                                        <ChevronRightIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                                <Transition
                                    show={open}
                                    enter="transform transition duration-300"
                                    enterFrom="transform scale-y-0"
                                    enterTo="transform scale-y-100"
                                    leave="transition duration-200 ease-out"
                                    leaveFrom="transform scale-y-100"
                                    leaveTo="transform scale-y-0"
                                >
                                    <DisclosurePanel className="transition-all duration-300 ease-in-out transform origin-top">
                                        <div className="">
                                            {item.subMenu.map((subMenu: any, index: any) => (
                                                <Tooltip
                                                    placement="right-start"
                                                    content={(
                                                        <div className="p-0 w-[200px]">
                                                            {subMenu.pantallas.map((pantalla: any, index: any) => (
                                                                <Link
                                                                    key={index}
                                                                    href={pantalla.href}
                                                                    className={classNames(
                                                                        pantalla.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md '
                                                                    )}
                                                                >
                                                                    <p className='mr-6'><pantalla.icon className="h-6 w-6 text-white" aria-hidden="true" /></p>
                                                                    <p className='text-right'>{pantalla.nombre}</p>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                    radius="sm"
                                                    delay={0}
                                                    offset={0}
                                                    closeDelay={0}
                                                    classNames={{
                                                        base: [
                                                            "before:bg-neutral-400 dark:before:bg-white",
                                                        ],
                                                        content: [
                                                            "text-white py-2 px-4 shadow-xl bg-gray-400",
                                                        ],
                                                    }}
                                                >
                                                    <button className="text-white w-full text-start hover:bg-gray-700 p-2 rounded-md">
                                                        {subMenu.nombre}
                                                    </button>
                                                </Tooltip>
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </Transition>
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
            <SignOut />
        </>
    );
}
