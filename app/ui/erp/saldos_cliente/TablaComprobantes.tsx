'use client'
import React, { useState, useRef, useEffect } from 'react';
import { DbCompEmitidosConsul, imprimirPDF } from '@/app/lib/data';
import TablaComprobantesSkeleton from './TablaComprobantesSkeleton';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import PopOverComp from './PopOverComp';



const TablaComprobantes = ({ cliente, pagina, setPagina }: any) => {
    const [columnWidths, setColumnWidths] = useState([25, 100, 25, 50, 25, 25, 50, 50]);
    const [compEmitidos, setCompEmitidos] = useState([]);
    const [ordenarConfig, setOrdenarConfig] = useState({ key: 'tipo', direction: 'asc' });
    const [loading, setLoading] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [comprobante, setComprobante] = useState();

    useEffect(() => {
        consultarComprobantes();
    }, []);

    async function consultarComprobantes() {
        if (cliente.codigo == '' || cliente.codigo == undefined) return
        setLoading(true);
        try {
            const respuesta = await DbCompEmitidosConsul(cliente.codigo, pagina, ordenarConfig.key, ordenarConfig.direction);
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

    useEffect(() => {
        consultarComprobantes();
    }, [ordenarConfig]);

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

    const handleContextMenu = (event: any, comp: any) => {
        event.preventDefault();
        setPopoverPosition({ x: event.clientX, y: event.clientY });
        setComprobante(comp);
        setIsPopoverOpen(true);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const imprimirComprobante = async (comp: any) => {
        const response = await imprimirPDF('FAC', comp.tipo, comp.num);

        // Convertir la respuesta en un Blob de tipo PDF
        const pdfBlob = await response.blob();

        // Crear una URL para el Blob del PDF
        const pdfURL = URL.createObjectURL(pdfBlob);

        // Crear un iframe invisible para cargar el PDF
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none'; // Ocultar el iframe
        iframe.src = pdfURL;

        // Cuando el iframe esté cargado, ejecutar el cuadro de diálogo de impresión
        iframe.onload = () => {
            iframe.contentWindow?.print(); // Abrir el cuadro de impresión nativo de Chrome
        };
        // Añadir el iframe al documento
        document.body.appendChild(iframe);
    }

    const consutlarComprobante = async (comp: any) => {
        window.open('/erp/operaciones/venta?tipo=' + comp.tipo + '&num=' + comp.num, '_blank');
    }


    return (
        <div className="overflow-x-auto overflow-y-auto max-h-[71vh] h-full">
            <table className="min-w-full w-full table-fixed">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="border-b">
                        <th
                            style={{ width: columnWidths[0] }}
                            scope="col"
                            className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-200 hover:text-white"
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
                                    className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-400"
                                    onMouseDown={(e) => handleMouseDown(0, e)}
                                />
                            </div>
                        </th>
                        <th
                            style={{ width: columnWidths[1] }}
                            scope="col"
                            className="relative px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden"
                        >
                            Comprobante
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(1, e)}
                            />
                        </th>
                        <th
                            style={{ width: columnWidths[2] }}
                            scope="col"
                            className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-200 hover:text-white"
                            onClick={() => orderComprobantes('num')}
                        >
                            <div className='flex px-2 py-2'>
                                Numero
                                {ordenarConfig.key === 'num' && (
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
                        <th style={{ width: columnWidths[3] }} scope="col" className="text-center relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Fecha
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(3, e)}
                            />
                        </th>
                        <th
                            style={{ width: columnWidths[4] }}
                            scope="col"
                            className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-200 hover:text-white"
                            onClick={() => orderComprobantes('estado')}
                        >
                            <div className='flex px-2 py-2'>
                                Estado
                                {ordenarConfig.key === 'estado' && (
                                    <span className="ml-2">
                                        {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                    </span>
                                )}
                                <div
                                    className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                    onMouseDown={(e) => handleMouseDown(4, e)}
                                />
                            </div>
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
                                <tr key={index} className="border-b hover:bg-gray-400 hover:!text-white" onContextMenu={(e) => handleContextMenu(e, comprobante)} >
                                    <td className="text-center text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm border border-gray-200">
                                        {comprobante.tipo}
                                    </td>
                                    <td className="text-start text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm border border-gray-200">
                                        {comprobante.comp.descrip}
                                    </td>
                                    <td className="text-end text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm border border-gray-200">
                                        {comprobante.num}
                                    </td>
                                    <td className="text-center text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm border border-gray-200">
                                        {comprobante.fecha}
                                    </td>
                                    <td className="text-center text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm border border-gray-200">
                                        {comprobante.estado}
                                    </td>
                                    <td className="text-center text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm border border-gray-200">
                                        {comprobante.mone}
                                    </td>
                                    <td className="text-ellipsis trunatce text-end px-2 py-1 whitespace-nowrap text-sm border border-gray-200">
                                        {comprobante.total.toLocaleString('es-AR')}
                                    </td>
                                    <td className="text-ellipsis trunatce text-end px-2 py-1 whitespace-nowrap text-sm border border-gray-200">
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
            {/* Popover */}
            <PopOverComp
                popoverPosition={popoverPosition}
                isPopoverOpen={isPopoverOpen}
                closePopover={closePopover}
                comprobante={comprobante}
                imprimirComprobante={imprimirComprobante}
                consutlarComprobante={consutlarComprobante}
            />

        </div>
    );
};

export default TablaComprobantes;
