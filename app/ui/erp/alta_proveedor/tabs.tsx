import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

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
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:hidden">
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => seleccionarTab(e.target.selectedIndex)}
                >
                    {tabs.map((tab, index) => (
                        <option key={tab.name} selected={index === tab}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="relative border-b border-gray-200 w-3/6">
                    <nav className="w -mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab, index) => (
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
