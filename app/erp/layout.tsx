'use client'

import { useState } from 'react';

import NavBar from '../ui/erp/navBar';


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSideBar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">

            {/* <SideNavMobile navigation={navigation} sidebarOpen={sidebarOpen} toggleSideBar={toggleSideBar} />
            
            <div className="hidden lg:flex lg:flex-shrink-0">
                <SideNav navigation={navigation} />
            </div> */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <NavBar>
                    {children}
                </NavBar>
                <main className="flex-1 w-full mt-16 relative z-0 overflow-y-auto focus:outline-none">
                    {/* <NavBar toggleSideBar={toggleSideBar} /> */}
                    {children}
                </main>
            </div>
        </div>
    );
}
