import React, { useState } from 'react';

import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import InputCommon from '../../inputCommon'
import TextAreaCommon from '../../TextAreaCommon';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

const FichaArticulo = ({ register, setValue, clearErrors, errors, consultarArticulo }: any) => {

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4 border-b">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Descripción.</h3>
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
                                    titulo={"Codigo del Articulo"}
                                    tipo={"text"}
                                    error={errors.codigo?.message}
                                    id="codigo"
                                    useForm={register("codigo", { onBlur: consultarArticulo })}
                                />
                            </div>
                            <div className="col-span-6">
                                <InputCommon
                                    titulo={"Descripcion"}
                                    tipo={"text"}
                                    error={errors.descripcion?.message}
                                    id="descripcion"
                                    useForm={register("descripcion")}
                                />
                            </div>

                            <div className="col-span-6">
                                <TextAreaCommon
                                    titulo={"Descripcion Adicional"}
                                    tipo={"text"}
                                    rows={3}
                                    error={errors.codigo?.descripcion_adicional}
                                    id="descripcion_adicional"
                                    useForm={register("descripcion_adicional")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FichaArticulo;
