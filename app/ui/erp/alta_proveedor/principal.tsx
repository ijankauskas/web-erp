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


const iva = [
    { id: '1', name: 'Consumidor Final' },
    { id: '2', name: 'Responsable Inscripto' },
    { id: '3', name: 'Responsable No Inscripto' },
    { id: '4', name: 'Exento' },
    { id: '5', name: 'Monotributista' },
];
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

const Principal = ({ register, setValue, clearErrors, errors, consultarProve, getValues }: any) => {

    const seleccionarCate_ivaSelec = (cate_iva: any) => {
        setValue('cate_iva', cate_iva);
        clearErrors('cate_iva');
    }

    const seleccionarAgru1Selec = (agru_1: any) => {
        setValue('agru_1', agru_1);
        clearErrors('agru_1');
    }
    const seleccionarAgru2Selec = (agru_2: any) => {
        setValue('agru_2', agru_2);
        clearErrors('agru_2');
    }
    const seleccionarAgru3Selec = (agru_3: any) => {
        setValue('agru_3', agru_3);
        clearErrors('agru_3');
    }


    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4 border-b">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Datos principales</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Esta informacion es importante, ten cuidado con lo que cargas.
                    </p>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6 gap-y-4">
                            <div className="col-span-6 sm:col-span-2">
                                <InputCommon
                                    titulo={"Numero de proveedor"}
                                    tipo={"number"}
                                    error={errors.codigo?.message}
                                    step={"0.01"}
                                    id="codigo"
                                    useForm={register("codigo", { onBlur: consultarProve })}
                                />
                            </div>
                            

                            <div className="hidden sm:flex sm:col-span-2">
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Razon Social"}
                                    tipo={"text"}
                                    error={errors.razon?.message}
                                    id="razon"
                                    useForm={register("razon")}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-2">
                                <InputCommon
                                    titulo={"CUIT"}
                                    tipo={"text"}
                                    error={errors.cuit?.message}
                                    id="cuit"
                                    useForm={register("cuit")}
                                />
                            </div>
                            <div className=" col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Nombre Fantasia"}
                                    tipo={"text"}
                                    error={errors.nombre_fantasia?.message}
                                    id="nombre_fantasia"
                                    useForm={register("nombre_fantasia")}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <ComboBoxSelect
                                    titulo={"Categoria de IVA"}
                                    data={iva}
                                    setearCodigo={seleccionarCate_ivaSelec}
                                    error={errors.cate_iva?.message}
                                    seleccionado={getValues ('cate_iva')}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-5">
                                <InputCommon
                                    titulo={"Email"}
                                    tipo={"email"}
                                    error={errors.mail?.message}
                                    id="email"
                                    useForm={register("mail")}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <ComboBoxSelect
                                    titulo={"Agrupacion 1"}
                                    data={people}
                                    seleccionado={getValues('agru_1')}
                                    setearCodigo={seleccionarAgru1Selec}
                                    error={errors.agru_1?.message}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <ComboBoxSelect
                                    titulo={"Agrupacion 2"}
                                    data={people}
                                    seleccionado={getValues('agru_2')}
                                    setearCodigo={seleccionarAgru2Selec}
                                    error={errors.agru_2?.message}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <ComboBoxSelect
                                    titulo={"Agrupacion 3"}
                                    data={people}
                                    seleccionado={getValues('agru_3')}
                                    setearCodigo={seleccionarAgru3Selec}
                                    error={errors.agru_3?.message}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Principal;
