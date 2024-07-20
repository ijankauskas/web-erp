'use client'
import { useState } from "react";
import ComboBoxSelect from "../../ComboBoxSelect";
import InputCommon from "../../inputCommon";
import { faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons/faPersonWalkingDashedLineArrowRight";

const people = [
    { id: 1, name: 'asdr' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
];

export default function Cabecera({ register, setValue, clearErrors, errors, mostrarErrorAlerta, getValues }: any) {

    const [nuevo, setNuevo]=useState(null)

    const seleccionarProveedorSelec = (proveedor: any) => {
        setValue('codProveedor', proveedor);
        clearErrors('codProveedor');
    }


    const consultarProveedores = (proveedor:any) => {
        setNuevo( proveedor.target.value);
        setValue('codProveedor', proveedor.target.value);

    }

    return (
        <>
            <div className="lgpx-8 pt-2 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-8">
                <div className="sm:col-span-4 md:col-span-4 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Numero"}
                            tipo={'number'}
                            placeholder={"Numero de la factura"}
                            useForm={register("numero")} />
                    </div>
                </div>
                <div className="sm:col-span-4 md:col-span-4 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Fecha"}
                            tipo={'date'}
                            placeholder={""}
                            useForm={register("fecha")} />
                    </div>
                </div>
                <div className="sm:col-span-4 md:col-span-4 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Fecha de vencimiento"}
                            tipo={'date'}
                            placeholder={""}
                            useForm={register("fechaVenci")} />
                    </div>
                </div>
                <div className="sm:col-span-4 md:col-span-4 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Fecha de Pago"}
                            tipo={'date'}
                            placeholder={""}
                            useForm={register("fechaPago")} />
                    </div>
                </div>

                <div className="sm:col-span-3 md:col-span-3 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Codigo"}
                            tipo={'text'}
                            placeholder={""}
                            useForm={register("codProveedor", { onBlur: consultarProveedores })}
                        />
                    </div>
                </div>
                <div className="sm:col-span-5 md:col-span-5 flex items-center">
                    <div className='w-full mr-2'>
                        <ComboBoxSelect
                            titulo={"Proveedor"}
                            data={people}
                            seleccionado={nuevo}
                            setearCodigo={seleccionarProveedorSelec}
                            mostrarError={mostrarErrorAlerta} />
                    </div>
                </div>
            </div>
        </>
    )

}