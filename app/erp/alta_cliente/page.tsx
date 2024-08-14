"use client"

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articuloSchema } from '../../validaciones/articulo';
import { PhotoIcon } from '@heroicons/react/24/outline';
import InputCommon from '@/app/ui/inputCommon';
import { clienteSchema } from '@/app/validaciones/cliente';
import Tabs from '@/app/ui/erp/alta_cliente/tabs';
import Principal from '@/app/ui/erp/alta_cliente/principal';
import DatosContacto from '@/app/ui/erp/alta_cliente/datosContacto';
import Tabla from '@/app/ui/erp/alta_cliente/Tabla';


type Inputs = {
    codigo: string,
    razon: string,
    nombre_fantasia: string,
    mail: string,
    agru_1: string,
    agru_2: string,
    agru_3: string,
}

import CheckCliente from '@/app/ui/erp/alta_cliente/CheckCliente';
import LoadingBar from 'react-top-loading-bar';

const people = [
    { id: '1', name: 'asdr' },
    { id: '2', name: 'Arlene Mccoy' },
    { id: '3', name: 'Devon Webb' },
    { id: '4', name: 'Tom Cook' },
    { id: '5', name: 'Tanya Fox' },
    { id: '6', name: 'Hellen Schmidt' },
];

const tabs = [
    { name: 'Ficha', href: '0', current: true },
    { name: 'Comprobantes', href: '1', current: false },
    { name: 'Team Members', href: '2', current: false },
    { name: 'Billing', href: '3', current: false },
];


export default function alta_cliente() {
    const [cargando, setCargando] = useState(false)
    const ref = useRef(null);
    const [tab, setTab] = useState(0)

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues } = useForm<Inputs>({
        defaultValues: {
            codigo: '',
            razon: '',
            nombre_fantasia: '',
            mail: '',
            agru_1: '',
            agru_2: '',
            agru_3: '',
        },
        resolver: zodResolver(clienteSchema)
    })

    const seleccionarTab = (tab: any) => {
        setTab(tab)
    }

    const enviarForm = async (data: any) => {
        console.log('aca');

        setCargando(true);
        const response = await fetch('http://localhost:8080/clientes', {
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
        <div className="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
            <div>
                <LoadingBar color='rgb(99 102 241)' ref={ref} />
            </div>
            <Tabs tabs={tabs} seleccionarTab={seleccionarTab} tab={tab} />
            <div className='relative '>
                <form action="#" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                    {tab === 0 ?
                        <>
                            <Principal
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                clearErrors={clearErrors} />
                            <DatosContacto
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                clearErrors={clearErrors} />
                            <CheckCliente
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                clearErrors={clearErrors}
                                getValues={getValues}
                            />
                        </> :
                        tab === 1 ? <Tabla /> :
                            'Posición no definida.'}
                    <div className="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Guardar
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
}
