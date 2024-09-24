"use client"

import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clienteSchema } from '@/app/validaciones/cliente';
import Principal from '@/app/ui/erp/alta_cliente/principal';
import DatosContacto from '@/app/ui/erp/alta_cliente/datosContacto';
import Tabla from '@/app/ui/erp/alta_cliente/Tabla';
import HeaderCliente from '@/app/ui/erp/alta_cliente/HeaderCliente';
import CheckCliente from '@/app/ui/erp/alta_cliente/CheckCliente';
import { DbBorrarCliente, DbConsultarCliente, DbGrabartarCliente } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { CheckIcon, ClipboardIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

type Inputs = {
    codigo: number,
    cuit: string,
    cate_iva: string
    razon: string,
    nombre_fantasia: string,
    mail: string,
    agru_1: string,
    agru_2: string,
    agru_3: string,
    telefono: string,
    celular: string,
    domicilio: string,
    localidad: string,
    observaciones: string,
    activo: any
}

export default function Alta_cliente() {
    const [cargando, setCargando] = useState(false)


    
    const eliminarCliente = async () => {
        let cliente = { codigo: getValues("codigo") }
        const response = await DbBorrarCliente(cliente);
        const mensaje = await response.json();
        if (response.ok) {
            setAlerta({
                message: mensaje.message,
                type: "success",
                alertVisible: true
            });
        } else {
            setAlerta({
                message: mensaje.message,
                type: "error",
                alertVisible: true
            });
        }
    };

      

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
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, watch } = useForm<Inputs>({
        defaultValues: {
            codigo: 0,
            cuit: '',
            cate_iva: '',
            razon: '',
            nombre_fantasia: '',
            mail: '',
            agru_1: '',
            agru_2: '',
            agru_3: '',
            telefono: '',
            celular: '',
            domicilio: '',
            localidad: '',
            observaciones: '',
            activo: true,
        },
        resolver: zodResolver(clienteSchema)
    })

    const consultarCliente = async () => {
        let codigo: number | null = getValues('codigo');

        if (cargando) {
            return
        }
        setCargando(true);

        const respuesta = await DbConsultarCliente(codigo);
        const data = await respuesta.json();

        if (respuesta.ok) {
            setValue('codigo', data.codigo);
            setValue('cuit', data.cuit);
            setValue('cate_iva', data.cate_iva);
            setValue('razon', data.razon);
            setValue('nombre_fantasia', data.nombre_fantasia);
            setValue('mail', data.mail);
            setValue('agru_1', data.agru_1);
            setValue('agru_2', data.agru_2);
            setValue('agru_3', data.agru_3);
            setValue('telefono', data.telefono);
            setValue('celular', data.celular);
            setValue('domicilio', data.domicilio);
            setValue('localidad', data.localidad);
            setValue('observaciones', data.observaciones);
            data.activo == 'S' ? setValue('activo', true) : setValue('activo', false);
            setCargando(false);
        } else {
            limpiar()
            setCargando(false);
        }

    }

    const enviarForm = async (data: any) => {
        if (cargando) {
            return
        }
        data.activo = data.activo || data.activo == 'S' ? 'S' : 'N';

        setCargando(true);
        //llamada al servicio
        const respuesta = await DbGrabartarCliente(data)

        if (respuesta.ok) {
            const data = await respuesta.json();
            setValue('codigo', data.codigo);
            setCargando(false);
            setAlerta({
                message: 'Se guardo correctamente el cliente',
                type: "success",
                alertVisible: true
            });
        } else {
            const errorMessage = await respuesta.json();
            setCargando(false);
            setAlerta({
                message: errorMessage.message,
                type: "error",
                alertVisible: true
            });
        }
    };

    const limpiar = () => {


        setValue('cuit', '');
        setValue('cate_iva', '');
        setValue('razon', '');
        setValue('nombre_fantasia', '');
        setValue('mail', '');
        setValue('agru_1', '');
        setValue('agru_2', '');
        setValue('agru_3', '');
        setValue('telefono', '');
        setValue('celular', '');
        setValue('domicilio', '');
        setValue('localidad', '');
        setValue('observaciones', '');
        setValue('activo', true);
    }

    const btnLimpiar = () => {

        setValue('codigo', 0);
        limpiar()
    }


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="max-w-screen-2xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
                <HeaderCliente />
                <div className='relative '>
                    <form action="#" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                        <div className="flex w-full flex-col">
                            <Tabs
                                aria-label="Options"
                                color={"primary"}
                                variant="underlined"
                                classNames={{
                                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                    cursor: "w-full bg-primary",
                                    tab: "max-w-fit px-0 h-12",
                                    tabContent: "group-data-[selected=true]:text-primary"
                                }}
                            >
                                <Tab
                                    key="photos"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <ClipboardIcon className="h-6 w-6" />
                                            <span>Principal</span>
                                        </div>
                                    }
                                >
                                    <Principal
                                        register={register}
                                        setValue={setValue}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        consultarCliente={consultarCliente}
                                        getValues={getValues} />
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
                                        watch={watch}
                                    />
                                </Tab>
                                <Tab
                                    key="music"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <CurrencyDollarIcon className="h-6 w-6" />
                                            <span>Comprobantes</span>
                                            <Chip size="sm" variant="faded">230</Chip>
                                        </div>
                                    }
                                >
                                    <Tabla cliente={getValues('codigo')} />
                                </Tab>
                            </Tabs>
                        </div>

                        <div className="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-4">
                            <button
                                type="button"
                                onClick={btnLimpiar}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                Limpiar
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
                                Guardar
                            </button>

                            <button
                                type="button"
                                onClick={eliminarCliente}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                Eliminar
                            </button>
                        </div>


                    </form>

                </div>
                <DismissibleAlert
                    message={alerta.message}
                    type={alerta.type}
                    onClose={closeAlertaDismiss}
                    showPanel={alerta.alertVisible}
                />
            </div>
        </Suspense>
    )
}
