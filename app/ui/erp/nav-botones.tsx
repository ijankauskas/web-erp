'use client'

import Link from 'next/link';
import { SignOut } from './SingOut';
import { Accordion, AccordionItem, Tooltip } from '@nextui-org/react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { KeyIcon } from '@heroicons/react/24/outline';
import { DbAutorizacionWSAA } from '@/app/lib/data';
import DismissibleAlert from '../DismissAlerta';
import Loading from '../Loading';
import { useState } from 'react';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBotones({ navigation, open }: any) {
    const [cargando, setCargando] = useState(false);
    const [respuesta, setRespuesta] = useState(false);

    const [alerta, setAlerta] = useState({
        message: "",
        type: "",
        alertVisible: false
    });

    const closeAlertaDismiss = () => {
        setAlerta((prev) => ({
            ...prev,
            alertVisible: false,
        }));

        setTimeout(() => {
            setAlerta({
                message: '',
                type: "",
                alertVisible: false
            });
        }, 300);
    };


    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    const wsaa = async (e: any) => {
        e.preventDefault();
        setCargando(true);
        const response = await DbAutorizacionWSAA()
        const mensaje = await response.json();

        if (response.ok) {
            setCargando(false);
            setRespuesta(true);
            setAlerta({
                message: mensaje.mensaje,
                type: "success",
                alertVisible: true
            })
        } else {
            setCargando(false);
            setAlerta({
                message: "error",
                type: "warning",
                alertVisible: true
            })
        }
    }
    return (
        <>
            {navigation.map((item: any, index: number) => (
                item.subMenu.length > 0 ? (
                    <Accordion key={index} variant="splitted" className='text-white py-0.5'>
                        <AccordionItem
                            key="1"
                            aria-label="Accordion 1"
                            title={<p className='text-white'> {open ? <span className='flex'><item.icon className="h-6 w-6 text-white mr-2" aria-hidden="true" /> {item.nombre}</span> : <item.icon className="h-6 w-6 text-white" aria-hidden="true" />}</p>}
                            className='bg-gray-800 text-white'
                        >
                            <div className="">
                                {item.subMenu.map((subMenu: any, index: any) => (
                                    <Dropdown placement="right-start" key={index}>
                                        <DropdownTrigger>
                                            <button
                                                type={"button"}
                                                className={`flex text-white w-full text-start hover:bg-gray-700 p-2 rounded-md`}
                                            >
                                                <p className='mr-6'><subMenu.icon className="h-6 w-6 text-white" aria-hidden="true" /></p>
                                                {open ? subMenu.nombre : ''}
                                            </button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            {subMenu.pantallas.map((pantalla: any, index: any) => (
                                                <DropdownItem key={index} className='p-0'>
                                                    <Link
                                                        href={pantalla.href}
                                                        className="block w-full h-full p-2 "
                                                    >
                                                        {pantalla.nombre}
                                                    </Link>
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                ))}
                            </div>
                        </AccordionItem>
                    </Accordion >
                ) : (
                    <Link
                        key={item.nombre}
                        href={item.href}
                        className={
                            classNames(
                                item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                    >
                        <item.icon className="mr-3 h-6 w-6 text-gray-400" aria-hidden="true" />
                        {item.nombre}
                    </Link>
                )
            ))
            }
            <div className="p-2">
                <a
                    onClick={(e) => wsaa(e)}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-700 p-2 "
                >
                    <KeyIcon className="h-6 w-6 mr-2 text-white" aria-hidden="true" />
                    {open ? 'Autorizacion WSAA' : ''}
                </a>
            </div>
            <SignOut isOpen={open} />

            <DismissibleAlert
                message={alerta.message}
                type={alerta.type}
                onClose={closeAlertaDismiss}
                showPanel={alerta.alertVisible}
            />

            <Loading cargando={cargando} respuesta={respuesta} />
        </>
    );
}
