'use cliente'
import { useState } from "react";
import ButtonCommon from "../../ButtonCommon";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CompPendiente from "../../consultas/CompPendientes";

export default function TablaComprobante({ register, cliente, abrirCompPend, abrirCompPendConsul, setAbrirCompPendConsul }: any) {
    const [columnWidths, setColumnWidths] = useState([200, 100, 100, 125, 100, 100, 100]);

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
            <div className="flex">
                <div className="w-[96%] col-span-1 h-[30.6vh] overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg bg-white border-gray-200 border">
                    <table className="min-w-full w-full table-fixed relative">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr className="border-b">
                                <th style={{ width: columnWidths[0] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Descripcion
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(0, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[1] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Numero
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(1, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[2] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Fecha
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(2, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[3] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Saldo A Cancelar
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(3, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[4] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Moneda
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(4, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[5] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Cotizacion
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(5, e)}
                                    />
                                </th>

                                <th style={{ width: columnWidths[6] }} scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="w-[4%]">
                    <div className="ml-4">
                        <ButtonCommon
                            type="button"
                            texto={<MagnifyingGlassIcon aria-hidden="true" className="h-7 w-7" />}
                            px={"px-1"}
                            py={"py-1"}
                            tooltip="Consulta Comprobantes Pendientes"
                            onClick={() => abrirCompPend(true)}
                        // desactivado={bloquear}
                        />
                    </div>
                </div>
            </div>
            {abrirCompPendConsul && (
                <CompPendiente
                    cliente={cliente.id}
                    open={abrirCompPendConsul}
                    setOpen={setAbrirCompPendConsul}
                />
            )}

        </>
    )
}