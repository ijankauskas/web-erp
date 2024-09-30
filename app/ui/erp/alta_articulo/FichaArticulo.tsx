"use client"

import React, { useEffect, useState } from 'react';

import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import InputCommon from '../../inputCommon'
import TextAreaCommon from '../../TextAreaCommon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ButtonCommon from '../ButtonCommon';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ArticulosConsul from '../consultas/articulos_consul';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

const people = [
    { id: '1', name: 'asdr' },
    { id: '2', name: 'Arlene Mccoy' },
    { id: '3', name: 'Devon Webb' },
    { id: '4', name: 'Tom Cook' },
    { id: '5', name: 'Tanya Fox' },
    { id: '6', name: 'Hellen Schmidt' },
];

const FichaArticulo = ({ register, setValue, clearErrors, errors, consultarArticulo, getValues }: any) => {
    const [articulo, setArticulo] = useState<any>({})
    const [consulArticulos, setConsulArticulos] = useState(false)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

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

    const consultar = () => {
        const params = new URLSearchParams(searchParams);
        let codigo: string | null = getValues('codigo');
        if (codigo) {
            params.set('codigo', codigo);
            replace(`${pathname}?${params.toString()}`);
            clearErrors()
        } else {
            params.delete('codigo');
            replace(`${pathname}?${params.toString()}`);
            clearErrors();

            return
        }

        consultarArticulo()
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        let codigo: string | null = params.get('codigo');
        if (codigo != '' && codigo != null) {
            setValue('codigo', codigo);
            consultarArticulo();
        }
    }, [searchParams]);

    useEffect(()=>{
        setConsulArticulos(false)
        setValue('codigo', articulo.codigo);
        consultar();
    },[articulo])

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
                            <div className="col-span-6 sm:col-span-2 flex items-end">
                                <div className='mr-4'>
                                    <InputCommon
                                        titulo={"Codigo del Articulo"}
                                        tipo={"text"}
                                        error={errors.codigo?.message}
                                        id="codigo"
                                        useForm={register("codigo", { onBlur: consultar })}
                                    />
                                </div>
                                <div>
                                    <ButtonCommon
                                        type="button"
                                        texto={<MagnifyingGlassIcon aria-hidden="true" className="h-7 w-7" />}
                                        px={"px-1"}
                                        py={"py-1"}
                                        tooltip="Buscar Articulos"
                                        onClick={() => setConsulArticulos(true)}
                                    />
                                </div>
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
                                    error={errors.errors?.errors}
                                    id="descripcion_adicional"
                                    useForm={register("descripcion_adicional")}
                                />
                            </div>


                            <div className="col-span-6 sm:col-span-2">
                                <ComboBoxSelect
                                    titulo={"Agrupacion 1"}
                                    data={people}
                                    setearCodigo={seleccionarAgru1Selec}
                                    error={errors.agru_1?.message}
                                    seleccionado={getValues('agru_1')}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <ComboBoxSelect
                                    titulo={"Agrupacion 2"}
                                    data={people}
                                    setearCodigo={seleccionarAgru2Selec}
                                    error={errors.agru_2?.message}
                                    seleccionado={getValues('agru_2')}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <ComboBoxSelect
                                    titulo={"Agrupacion 3"}
                                    data={people}
                                    setearCodigo={seleccionarAgru3Selec}
                                    error={errors.agru_3?.message}
                                    seleccionado={getValues('agru_3')}
                                />
                            </div>

                            <div className="col-span-6">
                                <InputCommon
                                    titulo={"Codigo de barra"}
                                    tipo={"text"}
                                    error={errors.cod_barras?.message}
                                    id="cod_barras"
                                    useForm={register("cod_barras")}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ArticulosConsul open={consulArticulos} setOpen={setConsulArticulos} setArticulo={setArticulo} />
        </div>
    );
};

export default FichaArticulo;
