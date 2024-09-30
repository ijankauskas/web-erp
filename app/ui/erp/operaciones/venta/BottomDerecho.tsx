import { useEffect, useRef, useState } from "react";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import InputCommon from "../../../inputCommon";
import ComboBoxSelect from "../../../ComboBoxSelect";
import { DbCompConsul, DbValoresConsul } from "@/app/lib/data";
import ButtonCommon from "../../ButtonCommon";



export default function BottomDerecho({ register, articulos, setAlerta, pagos, setPagos, iva, errors, bloquear, setValue, clearErrors, cliente }: any) {
    const [columnWidths, setColumnWidths] = useState([150, 400, 100, 125, 125, 100]);
    const [valores, setValores] = useState([]);
    const [comp, setComp] = useState([]);
    useEffect(() => {
        cargarComponente()
    }, [])
    function cargarComponente() {
        consultarValores();
        consultarReci();
    }

    const consultarReci = async () => {

        const respuesta = await DbCompConsul('S', 'I');
        const data = await respuesta.json();
        if (respuesta.ok) {
            const CompMapeados = data.map((comp: any) => ({
                id: comp.tipo || '',
                name: comp.descrip || '',
                prox_num: comp.prox_num.toString() || 1,
            }));
            setComp(CompMapeados);
        }
    }

    const seleccionarCompSelec = (compSelect: any) => {
        const prox_num: any = comp.filter((comp: any) => comp.id == compSelect);
        if (prox_num.length > 0) {
            setValue('num_reci', prox_num[0].prox_num);
        }
        setValue('tipo_reci', compSelect);
        clearErrors('tipo_reci');
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

    const seleccionarValor = (e: any, index: any) => {
        setPagos((prev: any) =>
            prev.map((item: any, idx: number) =>
                idx === index ? { ...item, ['id']: e } : item
            )
        );
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

    const agregarFilaPago = () => {
        setPagos((prevPagos: any[]) => [...prevPagos, { id: 'EF', importe: 0 }]);
    };

    const eliminar = (index: any) => {
        const pagosEliminar = pagos.filter((_: any, idx: any) => idx !== index);

        setPagos(pagosEliminar);
    }

    return (
        <div className="flex">

            <div className="flex w-full flex-col">
                <Tabs color={"primary"} aria-label="Pagos">
                    <Tab key="music" title="Totales">
                        <div className="p-4 h-[25vh] w-full overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg max-h-[400px] bg-white border-gray-200 border">
                            <div className="text-black flex justify-between items-center">
                                <label htmlFor="">Sub total Gravado</label>
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
                            <div className="text-black flex justify-between items-center">
                                <label htmlFor="">Total IVA</label>
                                <div className="w-[200px] mt-1">
                                    <InputCommon
                                        tipo={'text'}
                                        texto={articulos?.reduce((acc: number, articulo: any) => {
                                            const calculo = (iva * articulo.precio_vta * articulo.cantidad) / 100;
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
                                <div className="w-[200px] mt-1">
                                    <InputCommon
                                        tipo={'text'}
                                        texto={articulos?.reduce((acc: number, articulo: any) => {
                                            const calculo = (articulo.precio_vta * articulo.cantidad) + (iva * articulo.precio_vta * articulo.cantidad) / 100;
                                            return acc + parseFloat(calculo.toFixed(2));
                                        }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        id={'subtotal'}
                                        textAlign={'text-end'}
                                        desactivado={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab key="photos" title="Pagos">
                        <div className="flex">
                            <div className="mr-2 h-[25vh] overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg max-h-[400px] bg-white border-gray-200 border">
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

                                            <th style={{ width: columnWidths[5] }} scope="col" className="relative px-6 py-3">
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
                            <div className="h-8">
                                <ButtonCommon type={"button"} texto={"+"} onClick={agregarFilaPago} tooltip="Agregar Fila" />
                            </div>
                        </div>

                        <div className="pt-2 grid gap-x-2 gap-y-0 grid-cols-6 sm:grid-cols-12" >
                            <div className="col-span-4 sm:col-span-4 md:col-span-4 flex items-center">
                                <div className="w-full mr-2 h-20">
                                    <ComboBoxSelect
                                        titulo={"Recibo"}
                                        data={comp}
                                        setearCodigo={seleccionarCompSelec}
                                        error={errors.tipo_reci?.message}
                                        desactivado={bloquear}
                                    />
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-6 md:col-span-3 flex items-center">
                                <div className='w-full mr-2 h-20'>
                                    <InputCommon
                                        titulo={"Numero"}
                                        tipo={'number'}
                                        placeholder={"Numero del Recibo"}
                                        useForm={register("num_reci")}
                                        error={errors.num_reci?.message}
                                    />
                                </div>
                            </div>

                        </div>
                    </Tab>
                </Tabs>



            </div>
        </div >
    );
}
