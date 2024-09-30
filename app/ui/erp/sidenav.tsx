'use client'
import { useState } from 'react';
import NavBotones from './nav-botones';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function SideNav({ navigation }: any) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="flex flex-col">
                {/* Sidebar component */}
                <div
                    className={`flex flex-col flex-grow bg-gray-900 pt-5 pb-4 overflow-y-auto transition-all duration-300 ${isOpen ? 'w-64' : 'w-[100px]'
                        }`}
                >
                    <div className="flex items-center flex-shrink-0 px-4">
                        {/* Burger Button */}
                        <button
                            onClick={toggleMenu}
                            className="flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none bg-gray-700 rounded-md"
                        >
                            <span
                                className={`block w-6 h-0.5  bg-white  transition-transform ${isOpen ? 'transform rotate-45 translate-y-1.5' : ''
                                    }`}
                            ></span>
                            <span
                                className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? 'opacity-0' : ''
                                    }`}
                            ></span>
                            <span
                                className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
                                    }`}
                            ></span>
                        </button>
                        {isOpen ? (
                            <img
                                className={`h-8 w-auto ml-4 transition-opacity duration-300
                                    }`}
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Workflow"
                            />
                        ) : ('')}
                    </div>

                    {/* Sidebar Menu */}
                    <div className={`mt-5 flex-1 px-2 space-y-1 bg-gray-900`}>
                        <nav className={`transition-opacity duration-300 `}>
                            {/* Aquí puedes colocar tus botones de navegación */}
                            <NavBotones navigation={navigation} open={isOpen} />
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
