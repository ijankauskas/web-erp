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
    codigo: number,
    cuit: string,
    razon: string,
    nombre_fantasia: string,
    mail: string,
    agru_1: string,
    agru_2: string,
    agru_3: string,
    activo: any
}

import CheckCliente from '@/app/ui/erp/alta_cliente/CheckCliente';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { usePathname, useSearchParams,useRouter } from 'next/navigation';
import { DbConsultarCliente, DbGrabartarCliente } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';

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
    { name: 'Comprobantes', id: '1', current: false },
    { name: 'Team Members', id: '2', current: false },
    { name: 'Billing', id: '3', current: false },
];


export default function alta_cliente() {
    const [cargando, setCargando] = useState(false)
    const ref = useRef<LoadingBarRef | null>(null);
    const [tab, setTab] = useState(0)

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

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
            razon: '',
            nombre_fantasia: '',
            mail: '',
            agru_1: '',
            agru_2: '',
            agru_3: '',
            activo: true,
        },
        resolver: zodResolver(clienteSchema)
    })

    const seleccionarTab = (tab: any) => {
        setTab(tab)
    }

    const consultarCliente = async () => {
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

        const respuesta = await DbConsultarCliente(codigo);
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
            data.activo == 'S' ? setValue('activo', true) : setValue('activo', false);
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
        const respuesta = await DbGrabartarCliente(data)

        if (respuesta.ok) {
            const data = await respuesta.json();
            setValue('codigo', data.codigo);
            ref.current?.complete();
            setCargando(false);
            setAlerta({
                message: 'Se guardo correctamente el cliente',
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

        setValue('codigo', 0);
        setValue('razon', '');
        setValue('nombre_fantasia', '');
        setValue('mail', '');
        setValue('agru_1', '');
        setValue('agru_2', '');
        setValue('agru_3', '');
        setValue('activo', true);
    }


    return (
        <div className="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
            <div>
                <LoadingBar color='rgb(99 102 241)' ref={ref} />
            </div>
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
                                consultarCliente={consultarCliente}/>
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
                        </> :
                        tab == 1 ? <Tabla /> :
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
