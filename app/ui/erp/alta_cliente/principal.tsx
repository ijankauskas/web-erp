'use client'
import React, { useEffect, useState } from 'react';
import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import InputCommon from '../../inputCommon';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import ButtonCommon from '../ButtonCommon';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ClientesConsul from '../consultas/Clientes_consul';


type Inputs = {
    codigo: string,
    cuit: string,
    cate_iva: string,
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

const Principal = ({ register, setValue, clearErrors, errors, consultarCliente, getValues,bloquear,cliente,setCliente }: any) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [abrirClientesConsul, setAbrirClientesConsul] = useState(false);

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
    const consultar = () => {
        const params = new URLSearchParams(searchParams);
        let codigo: number | null = getValues('codigo');
        //para que no consuma al limpiar la pantalla        
        if (codigo && codigo != 0) {
            params.set('codigo', codigo.toString());
            replace(`${pathname}?${params.toString()}`);
            clearErrors()
        } else {
            params.delete('codigo');
            replace(`${pathname}?${params.toString()}`);
            clearErrors();
            return
        }
        consultarCliente()
    }
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        let codigo: string | null = params.get('codigo');
        if (codigo != '' && codigo != null) {
            setValue('codigo', parseFloat(codigo));
            consultarCliente();
        }
    }, [searchParams]);

    const toggleAbrirClientesConsul = () => {
        setAbrirClientesConsul(!abrirClientesConsul)
    }

    const seleccionarCliente = (cliente: any) => {
       
        setValue('codigo', cliente.codigo);
        setValue('razon', cliente.razon);
        setValue('cuit', cliente.cuit);
        setValue('nombre_fantasia', cliente.nombre_fantasia);
        setValue('cate_iva', cliente.cate_iva);
        setValue('domicilio', cliente.domicilio);
        setValue('telefono', cliente.telefono);
        setValue('localidad', cliente.localidad);
        setValue('activo', cliente.activo);
        setValue('agru_1', cliente.agru_1);
        setValue('agru_2', cliente.agru_2);
        setValue('agru_3', cliente.agru_3);
        setValue('celular', cliente.celular);
        setValue('mail', cliente.mail);
        setValue('observaciones', cliente.observaciones);
    }


    return (
        <>
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
                                <div className="col-span-4 sm:col-span-5 md:col-span-3 flex items-end">
                                    <div className='w-full mr-2 '>
                                        <InputCommon
                                            titulo={"Numero de cliente"}
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
                                            tooltip="Buscar Clientes"
                                            onClick={toggleAbrirClientesConsul}
                                            desactivado={bloquear}
                                        />
                                    </div>
                                </div>
                                <div className="hidden sm:flex sm:col-span-4"></div>
    
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
    
                                <div className="col-span-6 sm:col-span-3">
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
                                        seleccionado={getValues('cate_iva')}
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
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            {abrirClientesConsul && (
                <ClientesConsul
                    setCliente={seleccionarCliente}
                    open={abrirClientesConsul}
                    setOpen={setAbrirClientesConsul}
                />
            )}
        </>
    )
}
export default Principal