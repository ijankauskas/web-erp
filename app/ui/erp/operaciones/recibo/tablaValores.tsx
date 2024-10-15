'use client'

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ButtonCommon from "../../ButtonCommon";
import { useEffect, useState } from "react";
import InputCommon from "@/app/ui/inputCommon";
import ComboBoxSelect from "@/app/ui/ComboBoxSelect";
import { DbMonedasConsul, DbValoresConsul } from "@/app/lib/data";

export default function TablaValores({ register, pagos, setPagos }: any) {
    const [columnWidths, setColumnWidths] = useState([100, 200, 100, 100, 100]);
    const [valores, setValores] = useState([]);
    const [monedas, setMonedas] = useState([]);
    const [moneDefault, setMoneDefault] = useState('PES');

    useEffect(() => {
        cargarComponente()
    }, [])
    function cargarComponente() {
        consultarValores();
        consultarMonedas();
    }

    async function consultarValores() {
        let response = await DbValoresConsul('S')
        const data = await response.json();
        if (response.ok) {
            const transformedArray = data.map((item: any) => ({
                id: item.codi,
                name: item.descrip_valor,
                afecta_caja: item.afecta_caja,
                valo_sistema: item.valo_sistema,
                activo: item.activo,
                cuenta: item.cuenta,
                tipo_de_valor: item.tipo_de_valor
            }));

            setValores(transformedArray)
        } else {

        }
    }

    const consultarMonedas = async () => {
        const respuesta = await DbMonedasConsul();
        const data = await respuesta.json();
        if (respuesta.ok) {
            const MonedasMapeados = data.map((mone: any) => ({
                id: mone.mone || '',
                name: mone.mone || '',
                mone_coti: mone.mone_coti || 0,
            }));
            setMonedas(MonedasMapeados);
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

    const modificarPago = (e: React.ChangeEvent<HTMLInputElement>, index: any, field: string) => {
        const { value } = e.target;

        const valueWithoutSeparators = value.replace(/\./g, '').replace(',', '.');
        const numericValue = isNaN(parseFloat(valueWithoutSeparators)) ? 0 : parseFloat(valueWithoutSeparators);
        setPagos((prev: any) =>
            prev.map((item: any, idx: number) =>
                idx === index ? { ...item, [field]: numericValue } : item
            )
        );
    };

    const seleccionarValor = (e: any, index: any) => {
        setPagos((prev: any) =>
            prev.map((item: any, idx: number) =>
                idx === index ? { ...item, ['id']: e } : item
            )
        );
    }

    const seleccionarMoneda = (e: any, index: any) => {
        const mone_coti: any = monedas.filter((mone: any) => mone.id == e);

        setPagos((prev: any) =>
            prev.map((item: any, idx: number) =>
                idx === index ? { ...item, ['mone']: e, ['mone_coti']: mone_coti[0].mone_coti } : item
            )
        );
    }

    const agregarFilaPago = () => {
        const mone_coti: any = monedas.filter((mone: any) => mone.id == moneDefault);

        setPagos((prevPagos: any[]) => [...prevPagos, { id: 'EF', importe: 0, mone: moneDefault, ['mone_coti']: mone_coti[0].mone_coti }]);
    };

    const eliminar = (index: any) => {
        const pagosEliminar = pagos.filter((_: any, idx: any) => idx !== index);

        setPagos(pagosEliminar);
    }

    return (
        <>
            <div className="flex">
                <div className="w-[96%] col-span-1 h-[30.6vh] overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg bg-white border-gray-200 border">
                    <table className="min-w-full w-full table-fixed relative">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr className="border-b">
                                <th style={{ width: columnWidths[0] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Importe
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(0, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[1] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Tipos
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(1, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[2] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Moneda
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(2, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[3] }} scope="col" className="relative px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Cotizacion
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(3, e)}
                                    />
                                </th>

                                <th style={{ width: columnWidths[4] }} scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pagos?.map((pago: any, index: number) => (
                                <tr key={index} className={`${pago.error ? 'bg-red-300' : ''}`}>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200 text-ellipsis overflow-hidden">
                                        <InputCommon
                                            tipo={'text'}
                                            id={pago.importe}
                                            texto={pago.importe.toLocaleString('es-AR')}
                                            useForm={register(`importe-${index}`, {
                                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => modificarPago(e, index, 'importe'),
                                            })}
                                            paddingY={'py-0.5'}
                                            textAlign={'text-end'}
                                        />
                                    </td>
                                    <td className="relateive px-2 py-1 z-50 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        <ComboBoxSelect
                                            data={valores}
                                            setearCodigo={seleccionarValor}
                                            paddingY={'py-0.5'}
                                            // useForm={register(`id-${index}`)}
                                            seleccionado={pago.id}
                                            index={index}
                                        />
                                    </td>
                                    <td className="relateive px-2 py-1 z-50 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        <ComboBoxSelect
                                            data={monedas}
                                            setearCodigo={seleccionarMoneda}
                                            paddingY={'py-0.5'}
                                            // useForm={register(`id-${index}`)}
                                            seleccionado={pago.mone}
                                            index={index}
                                        />
                                    </td>
                                    <td className="relateive px-2 py-1 z-50 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        {pago.mone_coti}
                                    </td>
                                    <td className="w-12 px-6 py-1 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                eliminar(index);
                                            }}>
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-[4%]">
                    <div className="ml-4">
                        <ButtonCommon
                            type="button"
                            texto={<PlusCircleIcon aria-hidden="true" className="h-7 w-7" />}
                            px={"px-1"}
                            py={"py-1"}
                            tooltip="Agregar Fila"
                            onClick={agregarFilaPago}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}