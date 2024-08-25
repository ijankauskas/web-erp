import React, { useState } from 'react';

import InputCommon from '../../inputCommon'
import TextAreaCommon from '../../TextAreaCommon';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

const PreciosArticulo = ({ register, setValue, clearErrors, errors, getValues }: any) => {

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4 border-b">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Precio, Costo y Stock.</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        En esta seccion puedes modificar el precio de venta el costo y el stock.
                    </p>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6 gap-y-4">
                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Costo"}
                                    tipo={'number'}
                                    error={errors.costo?.message}
                                    step={"0.01"}
                                    id="costo"
                                    useForm={register("costo")}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Stock"}
                                    tipo={"number"}
                                    error={errors.stock?.message}
                                    step={"0.01"}
                                    id="stock"
                                    useForm={register("stock")}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Precio de venta"}
                                    tipo={"number"}
                                    error={errors.precio_vta?.message}
                                    step={"0.01"}
                                    id="precio_vta"
                                    useForm={register("precio_vta")}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Precio de oferta"}
                                    tipo={"number"}
                                    error={errors.precio_oferta?.message}
                                    step={"0.01"}
                                    id="precio_oferta"
                                    useForm={register("precio_oferta")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreciosArticulo;
