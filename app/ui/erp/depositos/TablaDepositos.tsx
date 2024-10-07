'use client'

import { useEffect, useRef, useState } from "react";
import { DbCompConsul, DbDepositosConsul } from "@/app/lib/data";
import InputCommon from "../../inputCommon";
import Alerta from "../alerta";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TablaDepositos({ setDepositosSelect }: any) {

    const [depositos, setDepositos] = useState([]);
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
        consultarDepositos()
    }


    const consultarDepositos = async () => {

        const respuesta = await DbDepositosConsul('', '');
        const data = await respuesta.json();
        if (respuesta.ok) {
            const DepositosMapeados = data.map((depositos: any) => ({

            }));
            setDepositos(data);

        }


    }


    const cargarDeposito = async (depositos: any) => {
        const params = new URLSearchParams(searchParams);
        let codigo: string | null = depositos.depo_codi;
        if (codigo) {
            params.set('depo_codi', codigo);
            replace(`${pathname}?${params.toString()}`);

        } else {
            params.delete('depo_codi');
            replace(`${pathname}?${params.toString()}`);


            return


        }
        const respuesta = await DbDepositosConsul('', codigo);
        const data = await respuesta.json();
        if (respuesta.ok) {

            setDepositosSelect(data[0])
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

                                <th style={{ width: columnWidths[3] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Domicilio
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(3, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[4] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Telefono
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(4, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[5] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Provincia
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(5, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[6] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Observaciones
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(6, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[2] }} scope="col" className="relative w-[50px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Activo
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(2, e)}
                                    />
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {depositos?.map((depositos: any, index: number) => (
                                <tr key={index} className="hover:bg-primary hover:text-white" onClick={() => cargarDeposito(depositos)}>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium  border border-gray-200 text-ellipsis overflow-hidden">
                                        {depositos.depo_codi}
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {depositos.descrip}
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {depositos.domicilio}
                                    </td>

                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {depositos.telefono}
                                    </td>

                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {depositos.provincia}
                                    </td>

                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {depositos.obser}
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm  border border-gray-200 text-ellipsis overflow-hidden">
                                        {depositos.activo}
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
