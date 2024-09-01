'use client'
import React, { useState, useRef, useEffect } from 'react';
import { DbConsultarCliente } from '@/app/lib/data';
import TablaClientesSkeleton from './TablaClientesSkeleton';
import Image from 'next/image';

export async function getServerSideProps() {
    const respuesta = await DbConsultarCliente(null, 'S', '');
    const data = await respuesta.json();
    return { props: { data } };
}


const TablaClientes = ({ busqueda, seleccionarCliente }: any) => {
    const [columnWidths, setColumnWidths] = useState([50, 125, 50]);
    const [clientes, setClientes] = useState([]);
    const [orderbarConfig, setOrdenarConfig] = useState({ key: null, direction: 'asc' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarComponente();
    }, []);

    async function cargarComponente() {
        setLoading(true);
        try {
            const respuesta = await DbConsultarCliente(null, 'S', busqueda);
            const data = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error('Error al cargar los clientes');
            }

            const clientesMapeados = data.map((cliente: any) => ({
                codigo: cliente.codigo || '',
                razon: cliente.razon || '',
                saldo: 15000,
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

    const handleMouseDown = (index, event) => {
        const startX = event.clientX;
        const startWidth = columnWidths[index];
        const onMouseMove = (e) => {
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

        if (orderbarConfig.key === key && orderbarConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedClientes = [...clientes].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setOrdenarConfig({ key, direction });
        setClientes(sortedClientes);
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
                            Codigo
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(0, e)}
                            />
                        </th>
                        <th
                            style={{ width: columnWidths[1] }}
                            scope="col"
                            className="relative px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-50 hover:!border-blue-500"
                            onClick={() => orderClientes('razon')}
                        >
                            Razon
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(1, e)}
                            />
                        </th>
                        <th
                            style={{ width: columnWidths[2] }}
                            scope="col"
                            className="text-end relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-50 hover:!border-blue-500"
                            onClick={() => orderClientes('saldo')}
                        >
                            Saldo
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(2, e)}
                            />
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
