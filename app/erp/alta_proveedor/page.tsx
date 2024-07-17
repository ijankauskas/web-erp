"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articuloSchema } from '../../validaciones/articulo';


import { PhotoIcon } from '@heroicons/react/24/outline';
import InputCommon from '@/app/ui/inputCommon';
import { proveedorSchema } from '@/app/validaciones/proveedor';
import Tabs from '@/app/ui/erp/alta_proveedor/tabs';
import Principal from '@/app/ui/erp/alta_proveedor/principal';
import DatosContacto from '@/app/ui/erp/alta_proveedor/datosContacto';

type Inputs = {
    codigo: string,
    razon: string,
    nombre_fantasia: string,
    mail: string,
    agru_1: string,
    agru_2: string,
    agru_3: string,
}

const people = [
    { id: '1', name: 'asdr' },
    { id: '2', name: 'Arlene Mccoy' },
    { id: '3', name: 'Devon Webb' },
    { id: '4', name: 'Tom Cook' },
    { id: '5', name: 'Tanya Fox' },
    { id: '6', name: 'Hellen Schmidt' },
];

const tabs = [
    { name: 'My Account', href: '0', current: true },
    { name: 'Company', href: '1', current: false },
    { name: 'Team Members', href: '2', current: false },
    { name: 'Billing', href: '3', current: false },
];


export default function alta_proveedor() {
    const [cargando, setCargando] = useState(false)
    const [tab, setTab] = useState(0)


    const seleccionarTab = (tab: any) => {
        setTab(tab)
    }

    const enviarForm = async (data: any) => {

        setCargando(true);
        const response = await fetch('http://localhost:8080/articulos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Se creo el usuario")
            setCargando(false);
        } else {
            const errorMessage = await response.json(); // Lee el cuerpo de la respuesta como JSON
            alert(errorMessage.message); // Muestra el mensaje de error en un alert
            setCargando(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8">
            <Tabs tabs={tabs} seleccionarTab={seleccionarTab} tab={tab} />
            <div className='relative'>
                {tab === 0 ?
                    <>
                        <Principal />
                        <DatosContacto />
                    </>:
                    tab === 1 ? <DatosContacto /> :
                        tab === 2 ? 'Llegaste tercero.' :
                            tab === 3 ? 'Llegaste último.' :
                                'Posición no definida.'}

            </div>

        </div>
    )
}
