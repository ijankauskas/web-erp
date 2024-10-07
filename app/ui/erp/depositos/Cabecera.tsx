"use client"

import React from 'react';
import InputCommon from '../../inputCommon';
import CheckDepositos from './CheckDepositos';

const Cabecera = ({ errors, register, setValue, clearErrors, getValues, watch }: any) => {


    return (
        <div className="">
            <div className="py-5 bg-white sm:p-6">
                <div className="h-20">
                    <InputCommon
                        titulo={"Codigo"}
                        tipo={"text"}
                        error={errors.depo_codi?.message}
                        id="depo_codi"
                        useForm={register("depo_codi")}
                    />
                </div>
                <div className="h-20">
                    <InputCommon
                        titulo={"Descripcion"}
                        tipo={"text"}
                        error={errors.descrip?.message}
                        id="descrip"
                        useForm={register("descrip")}
                    />
                </div>
                <div className="h-20">
                    <InputCommon
                        titulo={"Domicilio"}
                        tipo={"domicilio"}
                        error={errors.domicilio?.message}
                        id="domicilio"
                        useForm={register("domicilio")}
                    />
                </div>
                <div className="h-20">
                    <InputCommon
                        titulo={"Telefono"}
                        tipo={"text"}
                        error={errors.telefono?.message}
                        id="telefono"
                        useForm={register("telefono")}
                    />
                </div>
                <div className="h-20">
                    <InputCommon
                        titulo={"Provincia"}
                        tipo={"text"}
                        error={errors.provincia?.message}
                        id="provincia"
                        useForm={register("provincia")}
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
                    <CheckDepositos
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
