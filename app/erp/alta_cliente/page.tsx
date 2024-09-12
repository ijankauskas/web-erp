"use client"

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clienteSchema } from '@/app/validaciones/cliente';
import Principal from '@/app/ui/erp/alta_cliente/principal';
import DatosContacto from '@/app/ui/erp/alta_cliente/datosContacto';
import Tabla from '@/app/ui/erp/alta_cliente/Tabla';
import HeaderCliente from '@/app/ui/erp/alta_cliente/HeaderCliente';
import CheckCliente from '@/app/ui/erp/alta_cliente/CheckCliente';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { DbConsultarCliente, DbGrabartarCliente } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { ClipboardDocumentCheckIcon, ClipboardIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

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

export default function alta_cliente() {
    const [cargando, setCargando] = useState(false)
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

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        let codigo: string | null = params.get('codigo');
        if (codigo != '' && codigo != null) {
            setValue('codigo', parseFloat(codigo));
            consultarCliente();
        }
    }, []);

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
        setValue('localidad', '');
        setValue('observaciones', '');
        setValue('activo', true);
    }


    return (
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
                                        <ClipboardIcon className="h-6 w-6"/>
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
                                        <CurrencyDollarIcon className="h-6 w-6"/>
                                        <span>Comprobantes</span>
                                        <Chip size="sm" variant="faded">230</Chip>
                                    </div>
                                }
                            >
                                <Tabla cliente={getValues('codigo')} />
                            </Tab>
                        </Tabs>
                    </div>

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
    )
}
