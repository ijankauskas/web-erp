"use client"

import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proveedorSchema } from '@/app/validaciones/proveedor';
import Tabs from '@/app/ui/erp/alta_proveedor/tabs';
import Principal from '@/app/ui/erp/alta_proveedor/principal';
import DatosContacto from '@/app/ui/erp/alta_proveedor/datosContacto';
import CheckProve from '@/app/ui/erp/alta_proveedor/CheckProve';
import { DbConsultarProveedor, DbGrabartarProveedor } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import HeaderProveedor from '@/app/ui/erp/alta_proveedor/HeaderProveedor';

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
    activo: any,
    localidad: string,
    observaciones: string,
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
    { name: 'Ficha', id: '0', current: true },
    { name: 'Componentes', id: '1', current: false },
];


export default function Alta_proveedor() {
    const [cargando, setCargando] = useState(false)
    const [tab, setTab] = useState(0)

    const [alerta, setAlerta] = useState({
        message: "",
        type: "",
        alertVisible: false
    });

    const closeAlertaDismiss = () => {
        setAlerta({
            message: '',
            type: "",
            alertVisible: false
        });
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
            activo: true,
            localidad: '',
            observaciones: ''
        },
        resolver: zodResolver(proveedorSchema)
    })

    const seleccionarTab = (tab: any) => {
        setTab(tab)
    }

    const consultarProve = async () => {
        let codigo: number | null = getValues('codigo');

        if (cargando) {
            return
        }
        setCargando(true);

        const respuesta = await DbConsultarProveedor(codigo);
        const data = await respuesta.json();

        if (respuesta.ok) {
            setValue('codigo', data.codigo);
            setValue('cuit', data.cuit);
            setValue('razon', data.razon);
            setValue('nombre_fantasia', data.nombre_fantasia);
            setValue('mail', data.mail);
            setValue('agru_1', data.agru_1);
            setValue('agru_2', data.agru_2);
            setValue('agru_3', data.agru_3);
            setValue('telefono', data.telefono);
            setValue('celular', data.celular);
            setValue('domicilio', data.domicilio);
            data.activo == 'S' ? setValue('activo', true) : setValue('activo', false);
            setValue('localidad', data.localidad);
            setValue('observaciones', data.observaciones);
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
        const respuesta = await DbGrabartarProveedor(data)

        if (respuesta.ok) {
            const data = await respuesta.json();
            setValue('codigo', data.codigo);
            setCargando(false);
            setAlerta({
                message: 'Se guardo correctamente el proveedor',
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

        setValue('codigo', 0);
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
        setValue('activo', true);
        setValue('localidad', '');
        setValue('observaciones', '');
    }


    return (

        <Suspense fallback={<div>Loading...</div>}>
            <div className="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
                <HeaderProveedor />
                <Tabs tabs={tabs} seleccionarTab={seleccionarTab} tab={tab} />
                <div className='relative '>
                    <form action="#" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                        {tab == 0 ?
                            <>
                                <Principal
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    consultarProve={consultarProve}
                                    getValues={getValues}
                                />
                                <DatosContacto
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                />
                                <CheckProve
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    getValues={getValues}
                                    watch={watch}
                                />
                            </> :
                            tab == 1 ? <DatosContacto register={register} setValue={setValue} errors={errors} clearErrors={clearErrors} /> :
                                'Posición no definida.'}
                        <div className="px-4 py-3 bg-white text-right sm:px-6">
                            <button
                                type="button"
                                onClick={limpiar}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2">
                                Limpiar
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                                Guardar
                            </button>
                        </div>
                    </form>

                </div>
                {alerta.alertVisible && (
                    <DismissibleAlert
                        message={alerta.message}
                        type={alerta.type}
                        onClose={closeAlertaDismiss}
                    />
                )}
            </div>
        </Suspense>
    )
}
