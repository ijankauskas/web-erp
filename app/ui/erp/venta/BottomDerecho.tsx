import { useRef, useState } from "react";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import InputCommon from "../../inputCommon";

export default function BottomDerecho({ register, articulos, setAlerta, setArticulos }: any) {
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
        <div className="flex w-full flex-col">
            <Tabs color={"primary"} aria-label="Pagos">
                <Tab key="photos" title="Pagos">
                    <Card className="h-[25vh]">
                        <CardBody>
                            <div className="h-[25vh] overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg max-h-[400px] bg-white border-gray-200 border">
                                <table className="min-w-full w-full table-fixed">
                                    <thead className="bg-gray-100">
                                        <tr className="border-b">
                                            <th style={{ width: columnWidths[0] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                                Importe
                                                <div
                                                    className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                    onMouseDown={(e) => handleMouseDown(0, e)}
                                                />
                                            </th>
                                            <th style={{ width: columnWidths[1] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                                Tipo
                                                <div
                                                    className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                    onMouseDown={(e) => handleMouseDown(1, e)}
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
                                                <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 text-ellipsis overflow-hidden">
                                                    <InputCommon
                                                        tipo={'text'}
                                                        id={articulo.codigo}
                                                        texto={articulo.codigo}
                                                        paddingY={'py-0.5'}
                                                    />
                                                </td>
                                                <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200 text-ellipsis overflow-hidden">
                                                    {articulo.descripcion}
                                                </td>
                                                <td className="w-12 px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
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
                                            <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                                <InputCommon
                                                    tipo={'text'}
                                                    id="codigo"
                                                    paddingY={'py-0.5'}
                                                />
                                            </td>
                                            <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">

                                            </td>
                                            <td className="w-12 px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Eliminar
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="music" title="Totales">
                    <Card className="h-[25vh]">
                        <CardBody>
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
                                <div className="w-[200px] mt-1">
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
                                <div className="w-[200px]  mt-1">
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
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
