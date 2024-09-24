"use client"

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, PhotoIcon } from '@heroicons/react/24/outline';
import InputCommon from '@/app/ui/inputCommon';
import { proveedorSchema } from '@/app/validaciones/proveedor';
import Tabs from '@/app/ui/erp/alta_proveedor/tabs';
import Principal from '@/app/ui/erp/alta_proveedor/principal';
import DatosContacto from '@/app/ui/erp/alta_proveedor/datosContacto';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import CheckProve from '@/app/ui/erp/alta_proveedor/CheckProve';
import { DbBorrarProveedor, DbConsultarProveedor, DbGrabartarProveedor } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
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


export default function alta_proveedor() {
    const [cargando, setCargando] = useState(false)
    const [tab, setTab] = useState(0)
    const ref = useRef<LoadingBarRef | null>(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.complete();
        }
    }, []);

    const eliminarProveedor = async () => {
        let cliente = { codigo: getValues("codigo") }
        const response = await DbBorrarProveedor(cliente);
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
        setAlerta({
            message: '',
            type: "",
            alertVisible: false
        });
    };

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

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
        const params = new URLSearchParams(searchParams);
        let codigo: number | null = getValues('codigo');
        //para que no consuma al limpiar la pantalla        
        if (codigo && codigo != 0) {
            params.set('codigo', codigo.toString());
            replace(`${pathname}?${params.toString()}`);
            clearErrors()
        } else {
            params.delete('codigo');
            replace(`${pathname}?${params.toString()}`);
            clearErrors();
            limpiar();
            return
        }

        if (cargando) {
            return
        }
        setCargando(true);
        ref.current?.continuousStart();

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
            ref.current?.complete();
        } else {
            limpiar()
            setCargando(false);
            ref.current?.complete();
        }

    }

    const enviarForm = async (data: any) => {
        if (cargando) {
            return
        }
        data.activo = data.activo || data.activo == 'S' ? 'S' : 'N';

        setCargando(true);
        ref.current?.continuousStart();
        //llamada al servicio
        const respuesta = await DbGrabartarProveedor(data)

        if (respuesta.ok) {
            const data = await respuesta.json();
            setValue('codigo', data.codigo);
            ref.current?.complete();
            setCargando(false);
            setAlerta({
                message: 'Se guardo correctamente el proveedor',
                type: "success",
                alertVisible: true
            });
        } else {
            const errorMessage = await respuesta.json();
            ref.current?.complete();
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
        setValue('activo', true);
        setValue('localidad', '');
        setValue('observaciones', '');
    }


    const btnLimpiar = () => {

        setValue('codigo', 0);
        limpiar()
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        let codigo: string | null = params.get('codigo');
        if (codigo != '' && codigo != null) {
            setValue('codigo', parseFloat(codigo));
            consultarProve();
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
            <div>
                <LoadingBar color='rgb(99 102 241)' ref={ref} />
            </div>
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
                            onClick={eliminarProveedor}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Eliminar
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
    )
}
