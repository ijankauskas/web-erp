import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import ComboBoxSelect from '../../ComboBoxSelect';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

interface tab {
    name: string;
    href: string;
    current: boolean;
}

const Tabs = ({ tabs, seleccionarTab, tab }: any) => {

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
                <div className="relative border-b border-gray-200 w-3/6">
                    <nav className="w -mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab: any, index: any) => (
                            <button
                                key={tab.name}
                                onClick={() => seleccionarTab(index)}
                                className={classNames(
                                    tab === index
                                        ? 'text-indigo-600'
                                        : 'text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm w-3/12'
                                )}
                                aria-current={tab === index ? 'page' : undefined}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                    <div
                        className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300"
                        style={{
                            width: `${100 / tabs.length}%`,
                            transform: `translateX(${tab * 100}%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Tabs;
