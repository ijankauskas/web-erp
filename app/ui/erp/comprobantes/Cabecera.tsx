"use client"

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import { clienteSchema } from '@/app/validaciones/cliente';
import InputCommon from '../../inputCommon';
import { compSchema } from '@/app/validaciones/comp';

import CheckComp from './CheckComp';
import ButtonCommon from '../ButtonCommon';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { DbCompConsul, DbGrabarComp } from '@/app/lib/data';


type Inputs = {
    tipo: string,
    letra: string,
    prox_num: string,
    descrip: string,
    porcentaje: string,
    prefijo: string,
    activo: any,
}

const people = [
    { id: '1', name: 'asdr' },
    { id: '2', name: 'Arlene Mccoy' },
    { id: '3', name: 'Devon Webb' },
    { id: '4', name: 'Tom Cook' },
    { id: '5', name: 'Tanya Fox' },
    { id: '6', name: 'Hellen Schmidt' },
];



function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

const Cabecera = () => {

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, watch } = useForm<Inputs>({
        defaultValues: {
            tipo: '',
            letra: '',
            prox_num: '',
            descrip: '',
            porcentaje: '',
            prefijo: '',
            activo: true,
        },
        resolver: zodResolver(compSchema)
    })
    const limpiar = () => {


        setValue('tipo', '');
        setValue('letra', '');
        setValue('prox_num', '');
        setValue('descrip', '');
        setValue('porcentaje', '');
        setValue('prefijo', '');
        setValue('activo', '');

    }

  



    const enviarForm = async (data: any) => {


        data.activo = data.activo || data.activo == 'S' ? 'S' : 'N';


        const response = await DbGrabarComp(data)

        if (response.ok) {

            // setAlerta({
            //     message: 'Se guardo correctamente el comprobante',
            //     type: "success",
            //     alertVisible: true
            // });
        } else {
            const errorMessage = await response.json();

            // setAlerta({
            //     message: errorMessage.message,
            //     type: "error",
            //     alertVisible: true
            // });
        }
    };

   
   


    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Comprobantes</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Esta informacion es importante, ten cuidado con lo que cargas.
                    </p>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">

                <form action="#" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                    <div className="">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6 gap-y-4">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Tipo"}
                                        tipo={"text"}
                                        error={errors.tipo?.message}
                                        id="tipo"
                                        useForm={register("tipo")}

                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Letra"}
                                        tipo={"text"}
                                        error={errors.letra?.message}
                                        id="letra"
                                        useForm={register("letra")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Proximo a emitir"}
                                        tipo={"text"}
                                        error={errors.prox_num?.message}
                                        id="prox_num"
                                        useForm={register("prox_num")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Descrip"}
                                        tipo={"text"}
                                        error={errors.descrip?.message}
                                        id="descrip"
                                        useForm={register("descrip")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Porcentaje"}
                                        tipo={"text"}
                                        error={errors.porcentaje?.message}
                                        id="porcentaje"
                                        useForm={register("porcentaje")}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Prefijo"}
                                        tipo={"text"}
                                        error={errors.prefijo?.message}
                                        id="prefijo"
                                        useForm={register("prefijo")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6">
                                    <CheckComp
                                        register={register}
                                        setValue={setValue}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        getValues={getValues}
                                        watch={watch}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className=' flex items-end justify-end w-full' >

                        <div className='w-[150] mr-4'>
                            <ButtonCommon type="button" onClick={limpiar} texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Limpiar</>} />
                        </div>
                        <div className='w-[150]'>
                            <ButtonCommon type="submit" texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Guardar</>} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Cabecera;
