"use client"

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import { clienteSchema } from '@/app/validaciones/cliente';
import InputCommon from '../../inputCommon';


type Inputs = {
    codigo: string,
    cuit: string,
    cate_iva: string, 
    razon: string,
    nombre_fantasia: string,
    mail: string,
    agru_1: string,
    agru_2: string,
    agru_3: string,
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

const DatosContacto = ({register,setValue,clearErrors,errors}:any) => {

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Datos de contacto</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Esta informacion es importante, ten cuidado con lo que cargas.
                    </p>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">

                <div className="">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6 gap-y-4">
                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Telefono"}
                                    tipo={"text"}
                                    error={errors.telefono?.message}
                                    id="telefono"
                                    useForm={register("telefono")}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Celular"}
                                    tipo={"text"}
                                    error={errors.celular?.message}
                                    id="celular"
                                    useForm={register("celular")}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Domicilio"}
                                    tipo={"text"}
                                    error={errors.domicilio?.message}
                                    id="domicilio"
                                    useForm={register("domicilio")}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Localidad"}
                                    tipo={"text"}
                                    error={errors.localidad?.message}
                                    id="localidad"
                                    useForm={register("localidad")}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Observaciones"}
                                    tipo={"text"}
                                    error={errors.observaciones?.message}
                                    id="observaciones"
                                    useForm={register("observaciones")}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatosContacto;
