import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import ComboBoxSelect from '../../ComboBoxSelect';
import Tabs from '../alta_proveedor/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

interface tab {
    name: string;
    href: string;
    current: boolean;
}

const TabsCliente = ({ tabs, seleccionarTab, tab }: any) => {

    return (
        <div className="">
            <div className="sm:hidden">
                <select
                    id="tabs"
                    name="tabs"
                    className="relative z-0 mt-4 block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:ring-indigo-500"
                    value={tab}
                    onChange={(e) => seleccionarTab(e.target.selectedIndex)}
                >
                    {tabs.map((tabItem:any, index:any) => (
                        <option key={index} value={index} className="w-full">
                            {tabItem.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="relative border-b border-gray-200">
                    <nav className="-mb-px flex w-3/12" aria-label="Tabs">
                        {tabs.map((tabs: any, index: any) => (
                            <button
                                key={tabs.id}
                                onClick={() => seleccionarTab(index)}
                                className={`${tab === tabs.id
                                    ? 'text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } group relative min-w-0 flex-1 items-center justify-center  py-3 px-6 border-b-2 font-medium text-sm flex`}
                                aria-current={tab === tabs.id ? 'page' : undefined}
                            >
                                {tabs.name}
                            </button>
                        ))}
                    
                    <div
                        className="absolute -mb-px inset-x-0 bottom-0 h-0.5 bg-indigo-500 transition-transform duration-300"
                        style={{
                            width: `calc(${25 / tabs.length}%)`,
                            transform: `translateX(${tab * 100}%)`,
                        }}
                    />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default TabsCliente;
