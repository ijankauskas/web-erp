import React, { useState } from 'react';
import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import InputCommon from '../../inputCommon'
import TextAreaCommon from '../../TextAreaCommon';
import { umask } from 'process';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

const unidades = [
    { id: '1', name: 'UNI' },
    { id: '2', name: 'KG' },
    { id: '3', name: 'KGS' },
    { id: '4', name: 'LTS' },
    { id: '5', name: 'MTS' },
];

const PreciosArticulo = ({ register, setValue, clearErrors, errors, getValues }: any) => {

    const seleccionarUmSelec = (um: any) => {
        setValue('um', um);
        clearErrors('um');
    }

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
                                    titulo={"Costo c/IVA"}
                                    tipo={'number'}
                                    error={errors.costo_iva?.message}
                                    step={"0.01"}
                                    id="costo"
                                    useForm={register("cocosto_ivasto")}
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
                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"% IVA"}
                                    tipo={"number"}
                                    error={errors.iva?.message}
                                    step={"0.01"}
                                    id="iva"
                                    useForm={register("iva")}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <ComboBoxSelect
                                    titulo={"UM"}
                                    data={unidades}
                                    setearCodigo={seleccionarUmSelec}
                                    error={errors.agru_1?.message}
                                    seleccionado={getValues('um')}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <InputCommon
                                    titulo={"Cantidad Default"}
                                    tipo={"number"}
                                    error={errors.cant_default?.message}
                                    step={"1"}
                                    id="cant_default"
                                    useForm={register("cant_default")}
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
