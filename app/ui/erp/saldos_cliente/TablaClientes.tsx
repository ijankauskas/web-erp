'use client'
import React, { useState, useRef, useEffect } from 'react';
import { DbConsultarCliente, DbSaldosClientes } from '@/app/lib/data';
import TablaClientesSkeleton from './TablaClientesSkeleton';
import Image from 'next/image';
import {
    ChevronDownIcon,
    ChevronUpIcon
} from '@heroicons/react/24/outline'

export async function getServerSideProps() {
    const respuesta = await DbConsultarCliente(null, 'S', '');
    const data = await respuesta.json();
    return { props: { data } };
}


const TablaClientes = ({ busqueda, seleccionarCliente, pagina, setPagina }: any) => {
    const [columnWidths, setColumnWidths] = useState([50, 125, 50]);
    const [clientes, setClientes] = useState([]);
    const [ordenarConfig, setOrdenarConfig] = useState({ key: 'razon', direction: 'asc' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarComponente();
    }, []);

    async function cargarComponente() {
        setLoading(true);
        try {
            const respuesta = await DbSaldosClientes('clientes', pagina, busqueda, ordenarConfig.key, ordenarConfig.direction);
            const data = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error('Error al cargar los clientes');
            }

            const clientesMapeados = data.clientes.map((cliente: any) => ({
                codigo: cliente.codigo || '',
                razon: cliente.razon || '',
                saldo: cliente.saldoTotal,
            }));
            setClientes(clientesMapeados);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarComponente();
    }, [busqueda]);

    useEffect(() => {
        cargarComponente();
    }, [ordenarConfig]);

    useEffect(() => {
        console.log(pagina);

        cargarComponente();
    }, [pagina]);

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

    return (
        <div className="overflow-x-auto overflow-y-auto max-h-[71vh] h-full">
            <table className="min-w-full w-full table-fixed">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="border-b">
                        <th
                            style={{ width: columnWidths[0] }}
                            scope="col"
                            className="relative px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-50 hover:!border-blue-500"
                            onClick={() => orderClientes('codigo')}
                        >
                            <div className='flex'>
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
                            className="relative px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-50 hover:!border-blue-500"
                            onClick={() => orderClientes('razon')}
                        >
                            <div className='flex'>
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
                            className="text-end relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-50 hover:!border-blue-500"
                            onClick={() => orderClientes('saldo')}
                        >
                            <div className='flex'>
                                Saldo
                                {ordenarConfig.key === 'saldo' && (
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
                <tbody className="bg-white divide-y ">
                    {loading ? (
                        <TablaClientesSkeleton />
                    ) : (
                        clientes.length > 0 ? (
                            clientes?.map((cliente: any, index: number) => (
                                <tr key={index}
                                    className="hover:bg-indigo-50 hover:!border-blue-500 border-gray-200 hover:!border-1"
                                    onClick={() => seleccionarCliente(cliente)}
                                >
                                    <td className="text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm text-gray-900 border-r">
                                        {cliente.codigo}
                                    </td>
                                    <td className="text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r">
                                        {cliente.razon}
                                    </td>
                                    <td className="text-ellipsis truncate text-end px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r">
                                        {cliente.saldo.toLocaleString('es-AR')}
                                    </td>
                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan={3} className="w-full text-center px-2 py-4 text-sm text-gray-500">
                                    <div className="w-3/6 mx-auto">
                                        <Image
                                            src="/not-found.png"
                                            layout="responsive"
                                            width={500}
                                            height={205}
                                            className="flex items-center"
                                            alt="Screenshots of the dashboard project showing desktop version"
                                        />
                                        Ups!... No se encontraron clientes.
                                    </div>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaClientes;
