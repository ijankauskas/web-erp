"use client"

import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clienteSchema } from '@/app/validaciones/cliente';
// import Principal from '@/app/ui/erp/alta_cliente/principal';
import DatosContacto from '@/app/ui/erp/alta_cliente/datosContacto';
import Tabla from '@/app/ui/erp/alta_cliente/Tabla';
import CheckCliente from '@/app/ui/erp/alta_cliente/CheckCliente';
import { DbBorrarCliente, DbConsultarCliente, DbGrabartarCliente } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { CheckIcon, ClipboardDocumentIcon, ClipboardIcon, CloudArrowUpIcon, CurrencyDollarIcon, TrashIcon } from '@heroicons/react/24/outline';
import HeaderPage from '@/app/ui/erp/HeaderPage';
import Principal from '@/app/ui/erp/alta_cliente/principal';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
import Loading from '@/app/ui/Loading';

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
    const [cliente, setCliente] = useState<any>({})
    const [respuesta, setRespuesta] = useState(false);
    const [bloquearEliminar, setBloquearEliminar] = useState(true);

    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
        botonExtra: false,
        textoExtra: '',
        funcionExtra: () => { }
    });

    const cerrarAlerta = () => {
        setError((prev) => ({
            ...prev,
            mostrar: false,
        }));

    };

    const eliminarCliente = async () => {
        setCargando(true);
        setRespuesta(true);
        let cliente = { codigo: getValues("codigo") }
        const response = await DbBorrarCliente(cliente);
        const mensaje = await response.json();
        if (response.ok) {
            setCargando(false);
            setRespuesta(true);
            setAlerta({
                message: mensaje.message,
                type: "warning",
                alertVisible: true
            });
        } else {
            setCargando(false);
            setRespuesta(false);
            setAlerta({
                message: mensaje.message,
                type: "error",
                alertVisible: true
            });
        }
        limpiar()
        cerrarAlerta();
    }



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
            setRespuesta(true)
            setBloquearEliminar(false);
        } else {
            limpiar()
            setCargando(false);
            setRespuesta(false)
        }

    }

    const enviarForm = async (data: any) => {
        if (cargando) {
            return
        }
        setCargando(true);
        setRespuesta(true);
        data.activo = data.activo || data.activo == 'S' ? 'S' : 'N';

        setCargando(true);
        //llamada al servicio
        const respuesta = await DbGrabartarCliente(data)

        if (respuesta.ok) {
            setCargando(false);
            setRespuesta(true);
            setBloquearEliminar(false)
            setAlerta({
              message: 'Se guardo correctamente el cliente',
              type: "success",
              alertVisible: true
            });
          } else {
            const errorMessage = await respuesta.json();
            setCargando(false);
            setRespuesta(false);
            setAlerta({
              message: errorMessage.message,
              type: "error",
              alertVisible: true
            });
          }
        };

    const limpiar = () => {
        setBloquearEliminar(true);

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
                <HeaderPage titulo={"Alta de Clientes"} />
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
                                        getValues={getValues}
                                        setCliente={setCliente}
                                        cliente={cliente} />
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
                            <div className='w-[125px]'>
                                <ButtonCommon
                                    type={"button"}
                                    texto={<><ClipboardDocumentIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Limpiar</>}
                                    onClick={btnLimpiar}
                                    color={"other"}
                                />
                            </div>
                            <div className='w-[125px]'>
                                <ButtonCommon
                                    type={"submit"}
                                    texto={<><CloudArrowUpIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Guardar</>}
                                />
                            </div>
                            <div className='w-[125px]'>
                                <ButtonCommon
                                    type={"button"}
                                    texto={<><TrashIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Eliminar</>}
                                    onClick={eliminarCliente}
                                    color={"danger"}
                                    desactivado={bloquearEliminar}
                                />
                            </div>
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
            <Loading cargando={cargando} respuesta={respuesta} />
        </Suspense>
    )
}
