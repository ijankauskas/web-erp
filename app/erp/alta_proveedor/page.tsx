"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articuloSchema } from '../../validaciones/articulo';


import { PhotoIcon } from '@heroicons/react/24/outline';
import InputCommon from '@/app/ui/inputCommon';
import { proveedorSchema } from '@/app/validaciones/proveedor';
import ComboBoxSelect from '@/app/ui/ComboBoxSelect';

type Inputs = {
    codigo: string,
    razon: string,
}

export default function alta_proveedor() {
    const [cargando, setCargando] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            codigo: '',
            razon: '',
        },
        resolver: zodResolver(proveedorSchema)
    })

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
        <div className='flex justify-center'>
            <i className="fa-solid fa-circle-exclamation"></i>
            <form className='p-8 pt-2 w-full' onSubmit={handleSubmit(data => enviarForm(data))}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Crea Modifica proveedores.</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Esta seccion es solo para perfiles administradores.
                        </p>
                    </div>

                    <div className="border-b border-gray-900/10 pb-6">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <InputCommon
                                    titulo={"Codigo del proveedor"}
                                    tipo={"number"}
                                    error={errors.codigo?.message}
                                    id="codigo"
                                    useForm={register("codigo")}
                                />
                            </div>
                            <div className="sm:col-span-5 col-span-6">
                                <InputCommon
                                    titulo={"Razon social"}
                                    tipo={"text"}
                                    error={errors.razon?.message}
                                    id="razon"
                                    useForm={register("razon")}
                                />
                            </div>
                            <div className="sm:col-span-5 col-span-6">
                                <InputCommon
                                    titulo={"Nombre de fantasia"}
                                    tipo={"text"}
                                    error={errors.razon?.message}
                                    id="razon"
                                    useForm={register("razon")}
                                />
                            </div>
                            <div className="sm:col-span-3 col-span-6">
                                <InputCommon
                                    titulo={"Domicilio"}
                                    tipo={"text"}
                                    error={errors.razon?.message}
                                    id="razon"
                                    useForm={register("razon")}
                                />
                            </div>
                            <div className="sm:col-span-3 col-span-6">
                                <InputCommon
                                    titulo={"Localidad"}
                                    tipo={"text"}
                                    error={errors.razon?.message}
                                    id="razon"
                                    useForm={register("razon")}
                                />
                            </div>
                            <div className="sm:col-span-3 col-span-6">
                                <ComboBoxSelect
                                    titulo={"Provincia"}
                                    tipo={"text"}
                                    error={errors.razon?.message}
                                    id="razon"
                                    useForm={register("razon")}
                                />
                            </div>
                            <div className="sm:col-span-3 col-span-6">
                                <ComboBoxSelect
                                    titulo={"Pais"}
                                    tipo={"text"}
                                    error={errors.razon?.message}
                                    id="razon"
                                    useForm={register("razon")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {cargando ?
                            'Cargando...' : 'Grabar'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}
