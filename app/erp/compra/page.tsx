"use client"

import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import Alerta from '@/app/ui/erp/alerta';
import Tabla from '@/app/ui/erp/compra/tabla';
import InputCommon from '@/app/ui/inputCommon';
import { useEffect, useState } from 'react';

const people = [
    { id: 1, name: 'asdr' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
];

export default function alta_articulo() {
    const [cargando, setCargando] = useState(false);
    const [isInitialMount, setIsInitialMount] = useState(true);

    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
    });

    const [numero, setNumero] = useState();
    const [fecha, setFecha] = useState();
    const [fechaVenci, setFechaVenci] = useState();
    const [fechaPago, setFechaPago] = useState();
    const [codProveedor, setCodProveedor] = useState();
    const [codProveedorSeleccionado, setCodProveedorSeleccionado] = useState();

    const consultarProveedores = (proveedor: any) => {
        setCodProveedorSeleccionado(proveedor.target.value);
    }

    const seleccionarProveedorInput = (proveedor: any) => {
        setCodProveedor(proveedor.target.value);
    }

    const seleccionarProveedorSelec = (proveedor: any) => {
        setCodProveedor(proveedor);
    }

    useEffect(() => {
        if (isInitialMount) {
            setIsInitialMount(false);
            return;
        }
    });

    const mostrarErrorAlerta = () => {
        if (!isInitialMount)
            setError({
                mostrar: true,
                mensaje: 'Error: No se encontró ningun proveedor con ese codigo.',
                titulo: 'Oops...',
                icono: 'error-icon',
            });
    }

    const cerrarAlerta = () => {
        setError({
            mostrar: false,
            mensaje: '',
            titulo: '',
            icono: '',
        });
    }

    const ponerFecha = (fecha: any) => {
        setFecha(fecha.target.value);
    }
    const ponerFechaVenci = (fecha: any) => {
        setFechaVenci(fecha.target.value);
    }
    const ponerFechaPago = (fecha: any) => {
        setFechaPago(fecha.target.value);
    }

    return (
        <>
            <div className="px-8 pt-2 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-8">
                <div className="sm:col-span-4 md:col-span-2 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Numero"}
                            tipo={'number'}
                            placeholder={"Numero de la factura"}
                            texto={numero}
                            onChange={setNumero} />
                    </div>
                </div>
                <div className="sm:col-span-4 md:col-span-2 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Fecha"}
                            tipo={'date'}
                            placeholder={""}
                            texto={fecha}
                            onChange={ponerFecha} />
                    </div>
                </div>
                <div className="sm:col-span-4 md:col-span-2 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Fecha de vencimiento"}
                            tipo={'date'}
                            placeholder={""}
                            texto={fechaVenci}
                            onChange={ponerFechaVenci} />
                    </div>
                </div>
                <div className="sm:col-span-4 md:col-span-2 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Fecha de Pago"}
                            tipo={'date'}
                            placeholder={""}
                            texto={fechaPago}
                            onChange={ponerFechaPago} />
                    </div>
                </div>

                <div className="sm:col-span-2 md:col-span-2 flex items-center">
                    <div className='w-full mr-2'>
                        <InputCommon
                            titulo={"Codigo"}
                            tipo={'text'}
                            placeholder={""}
                            texto={codProveedor}
                            onChange={seleccionarProveedorInput}
                            funcionOnblur={consultarProveedores} />
                    </div>
                </div>
                <div className="sm:col-span-6 md:col-span-6 flex items-center">
                    <div className='w-full mr-2'>
                        <ComboBoxSelect
                            titulo={"Proveedor"}
                            data={people}
                            seleccionado={codProveedorSeleccionado}
                            setearCodigo={seleccionarProveedorSelec}
                            mostrarError={mostrarErrorAlerta} />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col p-8 pt-2">
                <div className="flex justify-end my-2">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Agregar Articulo
                    </button>
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <Tabla />
                </div>
            </div>

            {/*alerta */}
            <Alerta abrir={error.mostrar} cerrar={cerrarAlerta} titulo={error.titulo} texto={error.mensaje} />
        </>
    );


}
