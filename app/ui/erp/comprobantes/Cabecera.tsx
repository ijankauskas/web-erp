"use client"

import React, { useEffect } from 'react';
import InputCommon from '../../inputCommon';
import CheckComp from './CheckComp';
import ComboBoxSelect from '../../ComboBoxSelect';

const Cabecera = ({ errors, register, setValue, clearErrors, getValues, watch }: any) => {

    const letra = [
        { id: 'A', name: 'A' },
        { id: 'B', name: 'B' },
        { id: 'C', name: 'C' },
        { id: 'E', name: 'E' },
        { id: 'M', name: 'M' },
        { id: 'X', name: 'X' },
    ];

    const seleccionarLetraSelec = (letra: any) => {
        if (getValues('letra') !== letra) {
            setValue('letra', letra);
            clearErrors('letra');
        }
    };

    return (
        <div className="">
            <div className="py-5 bg-white sm:p-6">
                <div className="flex space-x-4 h-20">
                    <div className="w-1/3">
                        <InputCommon
                            titulo={"Codigo"}
                            tipo={"text"}
                            error={errors.tipo?.message}
                            id="tipo"
                            useForm={register("tipo")}
                        />
                    </div>
                    <div className="w-2/3">
                        <InputCommon
                            titulo={"Descripcion"}
                            tipo={"text"}
                            error={errors.descrip?.message}
                            id="descrip"
                            useForm={register("descrip")}
                        />
                    </div>
                </div>
                <div className="h-20">
                    <ComboBoxSelect
                        titulo={"Letra"}
                        data={letra}
                        setearCodigo={seleccionarLetraSelec}
                        error={errors.letra?.message}
                        seleccionado={getValues("letra")}
                    />
                </div>
                <div className="flex space-x-4 h-20">
                    <div className="flex-1">
                        <InputCommon
                            titulo={"Prox. Num"}
                            tipo={"number"}
                            error={errors.prox_num?.message}
                            id="prox_num"
                            useForm={register("prox_num")}
                        />
                    </div>
                    <div className="flex-1">
                        <InputCommon
                            titulo={"Porcentaje"}
                            tipo={"text"}
                            error={errors.porcentaje?.message}
                            id="porcentaje"
                            useForm={register("porcentaje")}
                        />
                    </div>
                    <div className="flex-1">
                        <InputCommon
                            titulo={"Prefijo"}
                            tipo={"text"}
                            error={errors.prefijo?.message}
                            id="prefijo"
                            useForm={register("prefijo")}
                        />
                    </div>
                </div>
                <div className="h-20">
                    <InputCommon
                        titulo={"Grupo de Comprobantes"}
                        tipo={"text"}
                        error={errors.cod_grupo?.message}
                        id="cod_grupo"
                        useForm={register("cod_grupo")}
                    />
                </div>
                <div className="h-20">
                    <InputCommon
                        titulo={"Cod. Afip"}
                        tipo={"text"}
                        error={errors.cod_afip?.message}
                        id="cod_afip"
                        useForm={register("cod_afip")}
                    />
                </div>
                <div className="h-20">
                    <InputCommon
                        titulo={"Compro. Elec"}
                        tipo={"text"}
                        error={errors.compro_elec?.message}
                        id="compro_elec"
                        useForm={register("compro_elec")}
                    />
                </div>
                <div className="h-20">
                    <InputCommon
                        titulo={"Observaciones"}
                        tipo={"text"}
                        error={errors.obser?.message}
                        id="obser"
                        useForm={register("obser")}
                    />
                </div>
                <div className="h-20">
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

    );
};

export default Cabecera;
