'use client'

import { useState } from "react";
import InputCommon from "../../inputCommon";


export default function TablaTotales({ register, articulos, setAlerta, setArticulos }: any) {
    const [columnWidths, setColumnWidths] = useState([150, 400, 100, 125, 125, 100]);
    const handleMouseDown = (index: any, event: any) => {
        const startX = event.clientX;
        const startWidth = columnWidths[index];
        const onMouseMove = (e: any) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newWidths = [...columnWidths];
            newWidths[index] = Math.max(newWidth, 50); // Establece un ancho mínimo
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
        <>
            <div className="px-8 grid grid-cols-12 gap-1 gap-y-0">
                <div className="col-span-9 mr-4">
                    <div className="h-[20vh] overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-[400px] bg-white border-gray-200 border">
                        <table className="min-w-full w-full table-fixed">
                            <thead className="bg-gray-100">
                                <tr className="border-b">
                                    <th style={{ width: columnWidths[0] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                        Codigo
                                        <div
                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                            onMouseDown={(e) => handleMouseDown(0, e)}
                                        />
                                    </th>
                                    <th style={{ width: columnWidths[1] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                        Descripcion
                                        <div
                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                            onMouseDown={(e) => handleMouseDown(1, e)}
                                        />
                                    </th>
                                    <th style={{ width: columnWidths[2] }} scope="col" className="relative w-[50px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                        Cantidad
                                        <div
                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                            onMouseDown={(e) => handleMouseDown(2, e)}
                                        />
                                    </th>
                                    <th style={{ width: columnWidths[3] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                        Precio
                                        <div
                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                            onMouseDown={(e) => handleMouseDown(3, e)}
                                        />
                                    </th>
                                    <th style={{ width: columnWidths[4] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                        Total
                                        <div
                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                            onMouseDown={(e) => handleMouseDown(4, e)}
                                        />
                                    </th>
                                    <th style={{ width: columnWidths[5] }} scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {articulos?.map((articulo: any, index: number) => (
                                    <tr key={index} className={`${articulo.error ? 'bg-red-300' : ''}`}>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 text-ellipsis overflow-hidden">
                                            <InputCommon
                                                tipo={'text'}
                                                id={articulo.codigo}
                                                texto={articulo.codigo}
                                                paddingY={'py-0.5'}
                                            />
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200 text-ellipsis overflow-hidden">
                                            {articulo.descripcion}
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200 text-ellipsis overflow-hidden">
                                            <InputCommon
                                                tipo={'text'}
                                                texto={articulo.cantidad.toLocaleString('es-AR')}
                                                id={`cantidad-${index}`}
                                                textAlign={'text-end'}
                                                paddingY={'py-0.5'}
                                            />
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200 text-ellipsis overflow-hidden">
                                            <InputCommon
                                                tipo={'text'}
                                                texto={articulo.precio_vta.toLocaleString('es-AR')}
                                                id={`precio_vta-${index}`}
                                                textAlign={'text-end'}
                                                paddingY={'py-0.5'}
                                            />
                                        </td>

                                        <td className="text-end px-3 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200 text-ellipsis overflow-hidden">
                                            {(articulo.cantidad * articulo.precio_vta).toLocaleString('es-AR')}
                                        </td>
                                        <td className="w-12 px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}>
                                                Eliminar
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-b">
                                    <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                        <InputCommon
                                            tipo={'text'}
                                            id="codigo"
                                            paddingY={'py-0.5'}
                                        />
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">

                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        <InputCommon
                                            tipo={'number'}
                                            id="cantidad"
                                            textAlign={'text-end'}
                                            paddingY={'py-0.5'}
                                        // texto={nuevoArticuloCompo.cantidad}
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                        />
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                                        <InputCommon
                                            tipo={'number'}
                                            id="cantidad"
                                            textAlign={'text-end'}
                                            paddingY={'py-0.5'}
                                        // texto={nuevoArticuloCompo.cantidad}
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                        />
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">

                                    </td>
                                    <td className="w-12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="text-black flex justify-between items-center">
                        <label htmlFor="">Sub total Gravado</label>
                        <div className="w-[200px]">
                            <InputCommon
                                tipo={'text'}
                                texto={articulos?.reduce((acc: number, articulo: any) => {
                                    const calculo = (79 * articulo.precio_vta * articulo.cantidad) / 100;
                                    return acc + parseFloat(calculo.toFixed(2));
                                }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                id={'subtotal'}
                                textAlign={'text-end'}
                                desactivado={true}
                            />

                        </div>
                    </div>
                    <div className="text-black flex justify-between items-center">
                        <label htmlFor="">Total IVA</label>
                        <div className="w-[200px]">
                            <InputCommon
                                tipo={'text'}
                                texto={articulos?.reduce((acc: number, articulo: any) => {
                                    const calculo = (21 * articulo.precio_vta * articulo.cantidad) / 100;
                                    return acc + parseFloat(calculo.toFixed(2));
                                }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                id={'subtotal'}
                                textAlign={'text-end'}
                                desactivado={true}
                            />
                        </div>
                    </div>
                    <div className="text-black flex justify-between items-center">
                        <label htmlFor="">Total Facturado</label>
                        <div className="w-[200px]">
                            <InputCommon
                                tipo={'text'}
                                texto={articulos?.reduce((acc: number, articulo: any) => {
                                    const calculo = (articulo.precio_vta * articulo.cantidad);
                                    return acc + parseFloat(calculo.toFixed(2));
                                }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                id={'subtotal'}
                                textAlign={'text-end'}
                                desactivado={true}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}
