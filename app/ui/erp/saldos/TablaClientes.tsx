'use client'
import React, { useState, useRef } from 'react';
import Paginacion from '../../Paginado';

const clientes = [
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
    {
        codigo: 12,
        razon: 'nacho',
        saldo: 14545646550.45
    },
]


const TablaClientes = () => {
    const [columnWidths, setColumnWidths] = useState([50, 50, 50]);

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
        <div className="overflow-x-auto overflow-y-auto max-h-[80vh]">
            <table className="min-w-full w-full table-fixed">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="border-b">
                        <th style={{ width: columnWidths[0] }} scope="col" className="relative px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Codigo
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(0, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[1] }} scope="col" className="relative px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Razon
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(1, e)}
                            />
                        </th>
                        <th style={{ width: columnWidths[2] }} scope="col" className="text-end relative w-[50px] px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                            Saldo
                            <div
                                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                onMouseDown={(e) => handleMouseDown(2, e)}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {clientes?.map((cliente: any, index: number) => (
                        <tr className="border-b">
                            <td className="text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                {cliente.codigo}
                            </td>
                            <td className="text-ellipsis truncate px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                {cliente.razon}
                            </td>
                            <td className="text-ellipsis truncate text-end px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                {cliente.saldo.toLocaleString('es-AR')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaClientes;
