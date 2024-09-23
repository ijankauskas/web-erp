'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import InputCommon from "../../inputCommon";
import ButtonCommon from "../ButtonCommon";
import { useEffect, useState } from "react";
import { DbCompEmitidosConsul } from "@/app/lib/data";

export default function CompPendiente({ cliente, setComprobante, open, setOpen }: any) {

    const [compEmitidos, setCompEmitidos] = useState([]);
    const [columnWidths, setColumnWidths] = useState([50, 500]);
    const [ordenarConfig, setOrdenarConfig] = useState({ key: 'tipo', direction: 'asc' });
    const [pagina, setPagina] = useState(1)

    const fecha_hoy = new Date().toISOString().split('T')[0];

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

    const orderComprobantes = (key: any) => {
        let direction = 'asc';
        if (ordenarConfig.key === key && ordenarConfig.direction === 'asc') {
            direction = 'desc';
        }
        setPagina(1);
        setOrdenarConfig({ key, direction });
    };
    async function consultarComprobantes() {
        // setLoading(true);
        try {
            const respuesta = await DbCompEmitidosConsul('3', pagina, ordenarConfig.key, ordenarConfig.direction);
            const data = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error('Error al cargar los clientes');
            }

            setCompEmitidos(data);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        } finally {
            // setLoading(false);
        }
    }
    useEffect(() => {
        consultarComprobantes();
    }, [ordenarConfig]);

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
                                    <DialogTitle className="text-lg font-medium text-gray-900">Consulta de Comprobantes Pendientes.</DialogTitle>
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
                                <div className="pt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-12">
                                    <div className="sm:col-span-2 col-span-2 flex items-center">
                                        <div className='w-full'>
                                            <InputCommon
                                                titulo={"Fecha Desde"}
                                                tipo={'date'}
                                                placeholder={""}
                                                texto={fecha_hoy} />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 col-span-2 flex items-center">
                                        <div className='w-full'>
                                            <InputCommon
                                                titulo={"Fecha Hasta"}
                                                tipo={'date'}
                                                placeholder={""}
                                                texto={fecha_hoy} />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 col-span-2 flex items-end">
                                        <div className=''>
                                            <ButtonCommon
                                                type="button"
                                                texto={<MagnifyingGlassIcon aria-hidden="true" className="h-7 w-7" />}
                                                px={"px-1"}
                                                py={"py-1"}
                                                tooltip="Buscar Comprobantes"
                                                onClick={consultarComprobantes}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-[60vh] mt-4 overflow-hidden shadow-md sm:rounded-lg overflow-x-auto overflow-y-auto">
                                    <table className="w-full min-w-full table-fixed">
                                        <thead className="bg-gray-100 sticky top-0 z-10">
                                            <tr className="border-b">
                                                <th
                                                    style={{ width: columnWidths[0] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                                    onClick={() => orderComprobantes('num')}
                                                >
                                                    <div className='flex px-2 py-2'>
                                                        Num
                                                        {ordenarConfig.key === 'num' && (
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
                                                    style={{ width: columnWidths[0] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                                    onClick={() => orderComprobantes('tipo')}
                                                >
                                                    <div className='flex px-2 py-2'>
                                                        Tipo
                                                        {ordenarConfig.key === 'tipo' && (
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
                                                    className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"

                                                // onClick={() => orderClientes('codigo')}
                                                >
                                                    <div className='flex px-2 py-2'>
                                                        Descripcion
                                                        {/* {ordenarConfig.key === 'codigo' && (
                                                            <span className="ml-2">
                                                                {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                                            </span>
                                                        )} */}
                                                        <div
                                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                            onMouseDown={(e) => handleMouseDown(1, e)}
                                                        />
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {compEmitidos?.map((comp: any, index: number) => (
                                                <tr key={index} className="border-b text-gray-900 hover:text-gray-100 hover:bg-indigo-500 hover:cursor-pointer ">
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border-r border-gray-200">
                                                        {comp.num}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border-r border-gray-200">
                                                        {comp.tipo}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border-l border-gray-200">
                                                        {comp.descripcion}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center mb-4">
                                {/* <Pagination color="primary" isCompact showControls total={50} initialPage={1} /> */}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* <Alerta
                abrir={error.mostrar}
                cerrar={cerrarAlerta}
                titulo={error.titulo}
                texto={error.mensaje}
            /> */}

        </>
    )
}