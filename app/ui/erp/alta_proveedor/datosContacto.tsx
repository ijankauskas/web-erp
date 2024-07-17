import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import { proveedorSchema } from '@/app/validaciones/proveedor';
import InputCommon from '../../inputCommon';


type Inputs = {
    codigo: string,
    razon: string,
    nombre_fantasia: string,
    mail: string,
    agru_1: string,
    agru_2: string,
    agru_3: string,
}

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

const DatosContacto = () => {
    const [cargando, setCargando] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm<Inputs>({
        defaultValues: {
            codigo: '',
            razon: '',
            nombre_fantasia: '',
            mail: '',
            agru_1: '',
            agru_2: '',
            agru_3: '',
        },
        resolver: zodResolver(proveedorSchema)
    })

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

    const enviarForm = async (data: any) => {

        setCargando(true);
        const response = await fetch('http://localhost:8080/articulos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Se creo el usuario")
            setCargando(false);
        } else {
            const errorMessage = await response.json(); // Lee el cuerpo de la respuesta como JSON
            alert(errorMessage.message); // Muestra el mensaje de error en un alert
            setCargando(false);
        }
    };

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Datos de contacto</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Esta informacion es importante, ten cuidado con lo que cargas.
                    </p>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6 gap-y-4">
                                <div className="col-span-6 sm:col-span-2">
                                    <InputCommon
                                        titulo={"Telefono"}
                                        tipo={"text"}
                                        error={errors.codigo?.message}
                                        id="codigo"
                                        useForm={register("codigo")}
                                    />
                                </div>

                                <div className="hidden sm:flex sm:col-span-4">
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Celular"}
                                        tipo={"text"}
                                        error={errors.razon?.message}
                                        id="razon"
                                        useForm={register("razon")}
                                    />
                                </div>

                                <div className=" col-span-6 sm:col-span-3">
                                    <InputCommon
                                        titulo={"Nombre Fantasia"}
                                        tipo={"text"}
                                        error={errors.nombre_fantasia?.message}
                                        id="nombre_fantasia"
                                        useForm={register("nombre_fantasia")}
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
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-2">
                                    <ComboBoxSelect
                                        titulo={"Agrupacion 2"}
                                        data={people}
                                        setearCodigo={seleccionarAgru2Selec}
                                        error={errors.agru_2?.message}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-2">
                                    <ComboBoxSelect
                                        titulo={"Agrupacion 3"}
                                        data={people}
                                        setearCodigo={seleccionarAgru3Selec}
                                        error={errors.agru_3?.message}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DatosContacto;
