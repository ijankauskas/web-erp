'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { PlusCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonCommon from '../ButtonCommon'
import Cabecera from '@/app/ui/erp/depositos/Cabecera'
import { useForm } from "react-hook-form";
import { depositosSchema } from '@/app/validaciones/depositos';
import { useEffect, useState } from 'react';
import { DbBorrarDepositos, DbGrabarDepositos } from '@/app/lib/data';
import Loading from '../../Loading';

type Inputs = {
    depo_codi: string,
    descrip: string,
    activo: any,
    domicilio: string,
    telefono: string,
    provincia: string,
    obser: string,
}

export default function Drawer({ abrir, toggleAbrir, depositosSelect, setAlerta, bloquearEliminar, setBloquearEliminar }: any) {
    const [cargando, setCargando] = useState(false);
    const [respuesta, setRespuesta] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, watch } = useForm<Inputs>({
        defaultValues: {
            depo_codi: '',
            descrip: '',
            activo: true,
            domicilio: '',
            telefono: '',
            provincia: '',
            obser: '',
        },
        resolver: zodResolver(depositosSchema)
    })

    // Función para limpiar el formulario
    const limpiar = () => {
        setBloquearEliminar(true)
        setValue('depo_codi', '');
        setValue('descrip', '');
        setValue('activo', '');
        setValue('domicilio', '');
        setValue('telefono', '');
        setValue('provincia', '');
        setValue('obser', '');
    };

    // Efecto para cargar los valores seleccionados en el formulario
    useEffect(() => {
        setValue('depo_codi', depositosSelect.depo_codi);
        setValue('descrip', depositosSelect.descrip);
        setValue('activo', depositosSelect.activo === "S" ? true : false);
        setValue('domicilio', depositosSelect.domicilio);
        setValue('telefono', depositosSelect.telefono);
        setValue('provincia', depositosSelect.provincia);
        setValue('obser', depositosSelect.obser);

    }, [depositosSelect, setValue]);



    const enviarForm = async (data: any) => {

        data.activo = data.activo || data.activo == 'S' ? 'S' : 'N';

        setCargando(true);
        //llamada al servicio
        const respuesta = await DbGrabarDepositos(data)
     
        if (respuesta.ok) {
            const data = await respuesta.json();
            setValue('depo_codi', data.depo_codi);
            setCargando(false);
            setAlerta({
                message: 'Se guardo correctamente el proveedor',
                type: "success",
                alertVisible: true
            });
            setBloquearEliminar(true)
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

    const eliminarDepositos = async () => {
        const response = await DbBorrarDepositos(depositosSelect);
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

  return (
    <Dialog open={abrir} onClose={toggleAbrir} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 w-4/12 overflow-hidden">
            <div className="absolute w-4/12 inset-0 overflow-hidden">
                <div className="pointer-events-none w-4/12 fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <DialogPanel
                        transition
                        className="pointer-events-auto relative w-full max-w-full transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                    >
                        <TransitionChild>
                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                                <button
                                    type="button"
                                    onClick={() => toggleAbrir}
                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <span className="absolute -inset-2.5" />
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                            <div className="px-4 sm:px-6">
                                <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Nuevo Depósito</DialogTitle>
                                <span className='text-sm text-gray-400'>Completa los campos para grabar</span>
                            </div>
                            <form action="#" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    <Cabecera
                                        errors={errors}
                                        register={register}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                        getValues={getValues}
                                        watch={watch}
                                    />
                                </div>
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex space-x-4">
                                        <ButtonCommon
                                            texto="Grabar"
                                            type="submit"
                                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ButtonCommon
                                            type="button"
                                            onClick={eliminarDepositos}
                                            texto={<><TrashIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Eliminar</>}
                                            color="danger"
                                            desactivado={bloquearEliminar}
                                            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                        <ButtonCommon
                                            type="button"
                                            onClick={limpiar}
                                            texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Limpiar</>}
                                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </div>
        <Loading cargando={cargando} respuesta={respuesta} />
    </Dialog>
)
}