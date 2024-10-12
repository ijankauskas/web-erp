'use client'

import { useEffect, useRef, useState } from "react";
import { DbCompConsul } from "@/app/lib/data";
import InputCommon from "../../inputCommon";
import Alerta from "../alerta";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TablaComprobantes({ setComprobantesSelect }: any) {

    const [comps, setComps] = useState([]);
    const [columnWidths, setColumnWidths] = useState([150, 400, 100, 125, 125, 100, 100, 100]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
        botonExtra: true,
        textoExtra: '',
        funcionExtra: () => { }
    });

    useEffect(() => {
        cargarComponente()
    }, [])

    async function cargarComponente() {
        consultarComp()
    }


    const consultarComp = async () => {
        const respuesta = await DbCompConsul('', '');
        const data = await respuesta.json();
        if (respuesta.ok) {
            setComps(data);
        }
    }


    const cargarComprobante = async (comp: any) => {
        const params = new URLSearchParams(searchParams);
        let codigo: string | null = comp.tipo;
        if (codigo) {
            params.set('tipo', codigo);
            replace(`${pathname}?${params.toString()}`);

        } else {
            params.delete('tipo');
            replace(`${pathname}?${params.toString()}`);


            return


        }
        const respuesta = await DbCompConsul('', codigo);
        const data = await respuesta.json();
        if (respuesta.ok) {

            setComprobantesSelect(data[0])
        }

    }

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
            <div className="py-1 min-w-full sm:px-6 lg:px-8 grid grid-cols-1">
                <div className="w-full col-span-1 h-[83vh] overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg bg-white border-gray-200 border"> {/* Contenedor con ancho al 100% y overflow */}
                    <table className="min-w-full w-full table-fixed">
                        <thead className="bg-gray-100">
                            <tr className="border-b">
                                <th style={{ width: columnWidths[0] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Codigo
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(0, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[1] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Descripcion
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(1, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[2] }} scope="col" className="relative w-[50px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Letra
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(2, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[3] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Prox. Num
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(3, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[4] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Porcentaje
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(4, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[5] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Prefijo
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(5, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[5] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Grupo Comp
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(5, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[5] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Cod_Afip
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(5, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[5] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Compro_elec
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(5, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[6] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Activo
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(6, e)}
                                    />
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {comps?.map((comp: any, index: number) => (
                                <tr key={index} className="hover:bg-primary hover:text-white" onClick={() => cargarComprobante(comp)}>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.tipo}
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.descrip}
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.letra}
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.prox_num}
                                    </td>

                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.porcentaje}
                                    </td>

                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.prefijo}
                                    </td>
                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.cod_grupo}
                                    </td>
                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.cod_afip}
                                    </td>
                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.compro_elec}
                                    </td>

                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {comp.activo}
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            {/*alerta 
            <Alerta
                abrir={error.mostrar}
                cerrar={cerrarAlerta}
                titulo={error.titulo}
                texto={error.mensaje}
                botonExtra={error.botonExtra}
                textoExtra={error.textoExtra}
                funcionExtra={error.funcionExtra}
            />*/}
        </>
    );
}
