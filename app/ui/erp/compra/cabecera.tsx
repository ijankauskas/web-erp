'use client'
import { useState } from "react";
import ComboBoxSelect from "../../ComboBoxSelect";
import InputCommon from "../../inputCommon";
import { faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons/faPersonWalkingDashedLineArrowRight";

const people = [
    { id: '1', name: 'asdr' },
    { id: '2', name: 'Arlene Mccoy' },
    { id: '3', name: 'Devon Webb' },
    { id: '4', name: 'Tom Cook' },
    { id: '5', name: 'Tanya Fox' },
    { id: '6', name: 'Hellen Schmidt' },
];

export default function Cabecera({ register, setValue, clearErrors, errors, mostrarErrorAlerta, getValues }: any) {
    const [num_cliente, setNum_cliente] = useState()
    const seleccionarClienteSelec = (cliente: any) => {
        setNum_cliente(cliente);
        setValue('num_cliente', cliente);
        clearErrors('num_cliente');
    }


    const consultarClientes = (cliente: any) => {
        setNum_cliente(cliente.target.value)
        setValue('num_cliente', cliente.target.value);
    }

    return (
        <>
            <div className="pt-2 grid gap-x-2 gap-y-2 grid-cols-6 sm:grid-cols-12">
                <div className="col-span-6 sm:col-span-6 md:col-span-3 flex items-center">
                    <div className='w-full mr-2'>
                        <ComboBoxSelect
                            titulo={"Tipo"}
                            data={people}
                            seleccionado={num_cliente}
                            setearCodigo={seleccionarClienteSelec}
                            mostrarError={mostrarErrorAlerta}
                        />
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-6 md:col-span-3 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Numero"}
                            tipo={'number'}
                            placeholder={"Numero de la factura"}
                            useForm={register("numero")} />
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-6 md:col-span-3 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Fecha"}
                            tipo={'date'}
                            placeholder={""}
                            useForm={register("fecha")} />
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-6 md:col-span-3 flex items-center">
                    <div className='w-full mr-2'>
                        <ComboBoxSelect
                            titulo={"Moneda"}
                            data={people}
                            seleccionado={num_cliente}
                            setearCodigo={seleccionarClienteSelec}
                            mostrarError={mostrarErrorAlerta}
                        />
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-3 md:col-span-3 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Codigo"}
                            tipo={'text'}
                            placeholder={""}
                            useForm={register("num_cliente", { onBlur: consultarClientes })}
                        />
                    </div>
                </div>

                <div className="col-span-4 sm:col-span-5 md:col-span-5 flex items-center">
                    <div className='w-full mr-2'>
                        <ComboBoxSelect
                            titulo={"Cliente"}
                            data={people}
                            seleccionado={num_cliente}
                            setearCodigo={seleccionarClienteSelec}
                            mostrarError={mostrarErrorAlerta} />
                    </div>
                </div>
            </div>
        </>
    )

}