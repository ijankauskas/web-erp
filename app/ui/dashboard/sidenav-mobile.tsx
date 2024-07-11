import Link from 'next/link';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
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


export default function SideNavMobile({ navigation, sidebarOpen, toggleSideBar }: any) {

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={toggleSideBar}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600"
                    onClick={toggleSideBar}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Workflow" />
                </div>
                <nav className="mt-5 px-2 space-y-1">
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
              <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <a href="#" className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <img className="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixqx=5VWETsAznz&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">Tom Cook</p>
                      <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
