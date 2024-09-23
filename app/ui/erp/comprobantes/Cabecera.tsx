"use client"

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { compSchema } from '@/app/validaciones/comp';
import InputCommon from '../../inputCommon';
import CheckComp from './CheckComp';
import ButtonCommon from '../ButtonCommon';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; // Importamos el icono de eliminar
import { DbBorrarComp, DbGrabarComp } from '@/app/lib/data';

type Inputs = {
    tipo: string,
    letra: string,
    prox_num: string,
    descrip: string,
    porcentaje: string,
    prefijo: string,
    activo: any,
}

const Cabecera = ({ compSelect, setAlerta }: any) => {
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
    });

    // Función para limpiar el formulario
    const limpiar = () => {
        setValue('tipo', '');
        setValue('letra', '');
        setValue('prox_num', '');
        setValue('descrip', '');
        setValue('porcentaje', '');
        setValue('prefijo', '');
        setValue('activo', '');
    };

    // Efecto para cargar los valores seleccionados en el formulario
    useEffect(() => {
        setValue('tipo', compSelect.tipo);
        setValue('letra', compSelect.letra);
        setValue('prox_num', compSelect.prox_num);
        setValue('descrip', compSelect.descrip);
        setValue('porcentaje', compSelect.porcentaje);
        setValue('prefijo', compSelect.prefijo);
        setValue('activo', compSelect.activo === "S" ? true : false);
    }, [compSelect, setValue]);

    // Función para manejar el envío del formulario (guardar)
    const enviarForm = async (data: any) => {
        data.activo = data.activo ? 'S' : 'N';

        const response = await DbGrabarComp(data);

        if (response.ok) {
            console.log('Guardado correctamente');
        } else {
            const errorMessage = await response.json();
            console.error('Error al guardar:', errorMessage.message);
        }
    };
    const eliminarComp = async () => {

        const response = await DbBorrarComp(compSelect);
        const mensaje = await response.json();
        if (response.ok) {
            setAlerta({
                message: mensaje.message,
                type: "success",
                alertVisible: true
            });
        } else {
            setAlerta({
                message: mensaje.message,
                type: "error",
                alertVisible: true
            });
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
                    <div className="flex items-end justify-end w-full">
                        <div className="w-[150] mr-4">
                            <ButtonCommon
                                type="button"
                                onClick={limpiar}
                                texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Limpiar</>}
                            />
                        </div>
                        <div className="w-[150] mr-4">
                            <ButtonCommon
                                type="submit"
                                texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Guardar</>}
                            />
                        </div>
                        <div className="w-[150]">
                            <ButtonCommon
                                type="button"
                                onClick={eliminarComp}
                                texto={<><TrashIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Eliminar</>}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Cabecera;
