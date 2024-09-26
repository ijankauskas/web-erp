"use client"

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { compSchema } from '@/app/validaciones/comp';
import InputCommon from '../../inputCommon';
import CheckComp from './CheckVendedores';
import ButtonCommon from '../ButtonCommon';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; // Importamos el icono de eliminar
import { DbBorrarComp, DbBorrarDepositos, DbGrabarComp, DbGrabarDepositos } from '@/app/lib/data';
import { depositosSchema } from '@/app/validaciones/depositos';
import CheckDepositos from './CheckVendedores';

type Inputs = {
    depo_codi: string,
    descrip: string,
    activo: any,
    domicilio: string,
    telefono: string,
    provincia: string,
    obser: string,
    
}

const Cabecera = ({ depositosSelect, setAlerta }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, watch } = useForm<Inputs>({
        defaultValues: {
            depo_codi: '',
            descrip: '',
            activo: true,
            domicilio: '',
            telefono: '',
            provincia: '',
            obser: '',
            
        },
        resolver: zodResolver(depositosSchema)
    });

    // Función para limpiar el formulario
    const limpiar = () => {
        setValue('depo_codi', '');
        setValue('descrip', '');
        setValue('activo', '');
        setValue('domicilio', '');
        setValue('telefono', '');
        setValue('provincia', '');
        setValue('obser', '');
    };

    // Efecto para cargar los valores seleccionados en el formulario
    useEffect(() => {
        setValue('depo_codi', depositosSelect.depo_codi);
        setValue('descrip', depositosSelect.descrip);
        setValue('activo', depositosSelect.activo === "S" ? true : false);
        setValue('domicilio', depositosSelect.domicilio);
        setValue('telefono', depositosSelect.telefono);
        setValue('provincia', depositosSelect.provincia);
        setValue('obser', depositosSelect.provincia);

    }, [depositosSelect, setValue]);

    // Función para manejar el envío del formulario (guardar)
    const enviarForm = async (data: any) => {
        data.activo = data.activo ? 'S' : 'N';

        const response = await DbGrabarDepositos(data);

        if (response.ok) {
            console.log('Guardado correctamente');
        } else {
            const errorMessage = await response.json();
            console.error('Error al guardar:', errorMessage.message);
        }
    };
    const eliminarDepositos = async () => {

        const response = await DbBorrarDepositos(depositosSelect);
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
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Depositos</h3>
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
                                        error={errors.depo_codi?.message}
                                        id="depo_codi"
                                        useForm={register("depo_codi")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Descripcion"}
                                        tipo={"text"}
                                        error={errors.descrip?.message}
                                        id="descrip"
                                        useForm={register("descrip")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Domicilio"}
                                        tipo={"domicilio"}
                                        error={errors.domicilio?.message}
                                        id="domicilio"
                                        useForm={register("domicilio")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Telefono"}
                                        tipo={"text"}
                                        error={errors.descrip?.message}
                                        id="telefono"
                                        useForm={register("telefono")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Provincia"}
                                        tipo={"text"}
                                        error={errors.provincia?.message}
                                        id="provincia"
                                        useForm={register("provincia")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Observaciones"}
                                        tipo={"text"}
                                        error={errors.obser?.message}
                                        id="obser"
                                        useForm={register("obser")}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6">
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
                                onClick={eliminarDepositos}
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
