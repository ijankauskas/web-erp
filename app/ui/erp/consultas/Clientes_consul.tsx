'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import InputCommon from "../../inputCommon";
import ButtonCommon from "../ButtonCommon";
import { DbConsultarArticulo, DbConsultarCliente } from "@/app/lib/data";
import { SetStateAction, useEffect, useState } from "react";
import Alerta from "../alerta";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Pagination } from "@nextui-org/react";

export default function ClientesConsul({ setArticulo, open, setOpen }: any) {
    const [columnWidths, setColumnWidths] = useState([100, 500, 500]);
    const [pagina, setPagina] = useState(1);
    const [ordenarConfig, setOrdenarConfig] = useState({ key: 'razon', direction: 'asc' });
    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
    });
    const cerrarAlerta = () => {
        setError({
            mostrar: false,
            mensaje: '',
            titulo: '',
            icono: '',
        });
    }

    const [clientes, setClientes] = useState<[]>([]);
    const [numCliente, setNumCliente] = useState(null);
    const settearNumCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumCliente(e.target.value);
    }
    const [razon, setRazon] = useState('');
    const settearRazon = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRazon(e.target.value);
    }

    const consultar = async () => {
        const respuesta = await DbConsultarCliente(numCliente, 'S', razon, ordenarConfig.key, ordenarConfig.direction, pagina, '50', 'S');
        const data = await respuesta.json();

        if (respuesta.ok) {
            setClientes(data)
        } else {
            setError({
                mostrar: true,
                mensaje: data.message,
                titulo: 'Oops...',
                icono: 'error-icon',
            });
        }
    }

    const agregarArticulo = ({ articulo }: any) => {
        const nuevo = {
            codigo: articulo.codigo,
            descripcion: articulo.descripcion,
            unidad: articulo.unidad,
            cantidad: articulo.cant_default || 0,
            precio_vta: articulo.precio_vta || 0,
            costo_uni: articulo.costo || 0
        };
        setArticulo((prev: any) => [...prev, nuevo]);
    }

    const handleMouseDown = (index: any, event: any) => {
        const startX = event.clientX;
        const startWidth = columnWidths[index];
        const onMouseMove = (e: any) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newWidths = [...columnWidths];
            newWidths[index] = Math.max(newWidth, 10); // Establece un ancho mínimo
            setColumnWidths(newWidths);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const orderClientes = (key: any) => {
        let direction = 'asc';
        if (ordenarConfig.key === key && ordenarConfig.direction === 'asc') {
            direction = 'desc';
        }
        setPagina(1);
        setOrdenarConfig({ key, direction });
    };

    useEffect(() => {
        consultar();
    }, [ordenarConfig]);

    useEffect(() => {
        consultar();
    }, [pagina]);

    return (
        <>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="w-11/12 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
                        >
                            <div className="w-10/12 py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="border-b flex items-start justify-between">
                                    <DialogTitle className="text-lg font-medium text-gray-900">Consulta de clientes.</DialogTitle>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-2 grid grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-12">
                                    <div className="sm:col-span-2 col-span-2 flex items-center">
                                        <div className='w-full'>
                                            <InputCommon
                                                titulo={'Codigo'}
                                                onChange={settearNumCliente}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4 col-span-4 flex items-center">
                                        <div className='w-full'>
                                            <InputCommon
                                                titulo={'Razon'}
                                                onChange={settearRazon}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 col-span-2 flex items-end">
                                        <div className='w-full mr-2'>
                                            <ButtonCommon texto={'Buscar'} onClick={consultar} type={'button'} />
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[60vh] mt-4 w-full overflow-hidden shadow-md sm:rounded-lg overflow-x-auto overflow-y-auto">
                                    <table className="min-w-full w-full table-fixed">
                                        <thead className="bg-gray-50">
                                            <tr className="border-b bg-gray-100">
                                                <th
                                                    style={{ width: columnWidths[0] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium uppercase tracking-wider border border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                                    onClick={() => orderClientes('codigo')}
                                                >
                                                    <div className='flex px-4 py-2'>
                                                        Codigo
                                                        {ordenarConfig.key === 'codigo' && (
                                                            <span className="ml-2">
                                                                {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                                            </span>
                                                        )}
                                                        <div
                                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                            onMouseDown={(e) => handleMouseDown(0, e)}
                                                        />
                                                    </div>
                                                </th>
                                                <th
                                                    style={{ width: columnWidths[1] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium uppercase tracking-wider border border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                                    onClick={() => orderClientes('razon')}
                                                >
                                                    <div className='flex px-4 py-2'>
                                                        Razon
                                                        {ordenarConfig.key === 'razon' && (
                                                            <span className="ml-2">
                                                                {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                                            </span>
                                                        )}
                                                        <div
                                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                            onMouseDown={(e) => handleMouseDown(1, e)}
                                                        />
                                                    </div>
                                                </th>
                                                <th
                                                    style={{ width: columnWidths[2] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium uppercase tracking-wider border border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                                    onClick={() => orderClientes('nombre_fantasia')}
                                                >
                                                    <div className='flex px-4 py-2'>
                                                        Nombre de Fantasia
                                                        {ordenarConfig.key === 'nombre_fantasia' && (
                                                            <span className="ml-2">
                                                                {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                                            </span>
                                                        )}
                                                        <div
                                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                            onMouseDown={(e) => handleMouseDown(2, e)}
                                                        />
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {clientes?.map((cliente: any, index: number) => (
                                                <tr onClick={() => agregarArticulo({ cliente })} className="border-b text-gray-900 hover:text-gray-100 hover:bg-indigo-500 hover:cursor-pointer ">
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border border-gray-200">
                                                        {cliente.codigo}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border border-gray-200">
                                                        {cliente.razon}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border border-gray-200">
                                                        {cliente.nombre_fantasia}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center mb-4">
                                <Pagination color="primary" isCompact showControls total={50} initialPage={1} />
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <Alerta
                abrir={error.mostrar}
                cerrar={cerrarAlerta}
                titulo={error.titulo}
                texto={error.mensaje}
            />

        </>
    )
}