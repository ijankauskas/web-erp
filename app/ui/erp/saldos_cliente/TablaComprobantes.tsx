'use client'
import React, { useState, useRef, useEffect } from 'react';
import { DbCompEmitidosConsul } from '@/app/lib/data';
import TablaComprobantesSkeleton from './TablaComprobantesSkeleton';
import Image from 'next/image';


const TablaComprobantes = ({ cliente, pagina }: any) => {
    const [columnWidths, setColumnWidths] = useState([25, 100, 25, 25, 25, 25, 50, 50]);
    const [compEmitidos, setCompEmitidos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        consultarComprobantes();
    }, []);

    async function consultarComprobantes() {
        if (cliente.codigo == '' || cliente.codigo == undefined) return
        setLoading(true);
        try {
            const respuesta = await DbCompEmitidosConsul(cliente.codigo,pagina);
            const data = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error('Error al cargar los clientes');
            }

            setCompEmitidos(data);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        consultarComprobantes();
    }, [cliente]);

    useEffect(() => {
        consultarComprobantes();
    }, [pagina]);

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

    return (
        <div className="overflow-x-auto overflow-y-auto max-h-[71vh] h-full">
            <table className="min-w-full w-full table-fixed">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="border-b">
                        <th style={{ width: columnWidths[0] }} scope="col" className="relative px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Codigo
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(0, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[1] }} scope="col" className="relative px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Comprobante
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(1, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[2] }} scope="col" className="text-center relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Numero
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(2, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[3] }} scope="col" className="text-center relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Fecha
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(3, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[4] }} scope="col" className="text-center relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Estado
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(4, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[5] }} scope="col" className="text-center relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Moneda
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(5, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[6] }} scope="col" className="text-center relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Total
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(6, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[7] }} scope="col" className="text-center relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Saldo
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(7, e)}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <TablaComprobantesSkeleton />
                    ) : (
                        compEmitidos.length > 0 ? (
                            compEmitidos?.map((comprobante: any, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="text-center text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                        {comprobante.tipo}
                                    </td>
                                    <td className="text-start text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        {comprobante.descripcion}
                                    </td>
                                    <td className="text-end text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        {comprobante.num}
                                    </td>
                                    <td className="text-center text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        {comprobante.fecha}
                                    </td>
                                    <td className="text-center text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        {comprobante.estado}
                                    </td>
                                    <td className="text-center text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        {comprobante.moneda}
                                    </td>
                                    <td className="text-ellipsis trunatce text-end px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        {comprobante.total.toLocaleString('es-AR')}
                                    </td>
                                    <td className="text-ellipsis trunatce text-end px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        {comprobante.saldo.toLocaleString('es-AR')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="w-full text-center px-2 py-4 text-sm text-gray-500">
                                    <div className="w-2/6 mx-auto">
                                        <Image
                                            src="/not-found.png"
                                            layout="responsive"
                                            width={500}
                                            height={205}
                                            className="flex items-center"
                                            alt="Screenshots of the dashboard project showing desktop version"
                                        />
                                        No hay comprobantes pendientes.
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

export default TablaComprobantes;
