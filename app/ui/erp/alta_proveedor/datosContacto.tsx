import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import { proveedorSchema } from '@/app/validaciones/proveedor';
import InputCommon from '../../inputCommon';


type Inputs = {
    codigo: string,
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
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4 border-b">
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatosContacto;
