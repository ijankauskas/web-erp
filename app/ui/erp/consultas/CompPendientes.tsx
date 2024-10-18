'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import InputCommon from "../../inputCommon";
import ButtonCommon from "../ButtonCommon";
import { useEffect, useState } from "react";
import { DbCompEmitidosConsul } from "@/app/lib/data";
import Image from "next/image";
import { Pagination } from "@nextui-org/react";
import TablaSkeleton from "../skeleton/tablaSkeleton";
import { set } from "zod";


const fechaArgentina = new Date().toLocaleDateString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
}).split('/');

// Reordenamos la fecha a 'yyyy-MM-dd' que es el formato que acepta el input date
const fechaFormateada = `${fechaArgentina[2]}-${fechaArgentina[1]}-${fechaArgentina[0]}`;

// Crear una fecha actual ajustada a la zona horaria de Argentina
const fechaHoy = new Date()

// Convertir la fecha a un objeto Date y restar un mes
const fechaActual = new Date(fechaHoy);
fechaActual.setMonth(fechaActual.getMonth() - 1); // Restar un mes

// Formatear la fecha como dd/MM/yyyy
const fechaFormateadatest = fechaActual.toLocaleDateString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
}).split('/');

const fechaFormateadaHasta = `${fechaFormateadatest[2]}-${fechaFormateadatest[1]}-${fechaFormateadatest[0]}`;

export default function CompPendiente({ cliente, setComprobante, open, setOpen, solo = 'N' }: any) {
    const [loading, setLoading] = useState(false);
    const [fechaDesde, setFechaDesde] = useState(fechaFormateadaHasta);
    const [fechaHasta, setFechaHasta] = useState(fechaFormateada);
    const [compEmitidos, setCompEmitidos] = useState([]);
    const [columnWidths, setColumnWidths] = useState([50, 50, 500, 50]);
    const [ordenarConfig, setOrdenarConfig] = useState({ key: 'tipo', direction: 'asc' });
    const [pagina, setPagina] = useState(1)
    const [totalPages, setTotalPages] = useState(1);

    const settearFechaDesde = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFechaDesde(e.target.value);
    }

    const settearFechaHasta = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFechaHasta(e.target.value);
    }
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
    async function consultarComprobantes() {
        setLoading(true);
        try {
            const respuesta = await DbCompEmitidosConsul(cliente, pagina, ordenarConfig.key, ordenarConfig.direction, fechaDesde, fechaHasta, 'F,A,C,B');
            const data = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error('Error al cargar los clientes');
            } else {
                const comps = data.comp.map((comp: any) => ({
                    tipo: comp.tipo || '',
                    num: comp.num || '',
                    fecha: formatearFecha(comp.fecha),
                    descrip: comp.comp.descrip,
                    saldo: comp.saldo,
                    mone: comp.mone,
                    mone_coti: comp.mone_coti,
                    seleccionado: false
                }));

                setCompEmitidos(comps);
                setTotalPages(Math.ceil(data.total / 50))
            }

        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        consultarComprobantes();
    }, [ordenarConfig]);

    useEffect(() => {
        consultarComprobantes();
    }, [pagina]);

    function formatearFecha(fechaISO: string): string {
        const fecha = new Date(fechaISO);

        const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura que tenga 2 dígitos
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
        const anio = fecha.getFullYear();

        return `${dia}/${mes}/${anio}`; // Formato dd/MM/yyyy
    }

    const selccionarComp = (index: any) => {
        if (solo = 'S') {

            let comp = compEmitidos.find((comp: any, idx: number) => idx === index);
            
            setComprobante(comp)
        } else {
            setCompEmitidos((prev: any) =>
                prev.map((item: any, idx: number) =>
                    idx === index ? { ...item, seleccionado: !item.seleccionado } : item
                )
            );
        }
    }

    const setComprobantes = () => {
        const compEmitidosSelect = compEmitidos.filter((comp: any) => comp.seleccionado == true);
        setComprobante(compEmitidosSelect);
    }

    return (
        <>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="w-11/12 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
                        >
                            <div className="w-10/12 py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="border-b flex items-start justify-between">
                                    <DialogTitle className="text-lg font-medium text-gray-900">Consulta de Comprobantes Pendientes.</DialogTitle>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-12">
                                    <div className="sm:col-span-2 col-span-2 flex items-center">
                                        <div className='w-full'>
                                            <InputCommon
                                                titulo={"Fecha Desde"}
                                                tipo={'date'}
                                                placeholder={""}
                                                texto={fechaDesde}
                                                onChange={settearFechaDesde}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 col-span-2 flex items-center">
                                        <div className='w-full'>
                                            <InputCommon
                                                titulo={"Fecha Hasta"}
                                                tipo={'date'}
                                                placeholder={""}
                                                texto={fechaHasta}
                                                onChange={settearFechaHasta}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 col-span-2 flex items-end">
                                        <div className=''>
                                            <ButtonCommon
                                                type="button"
                                                texto={<MagnifyingGlassIcon aria-hidden="true" className="h-7 w-7" />}
                                                px={"px-1"}
                                                py={"py-1"}
                                                tooltip="Buscar Comprobantes"
                                                onClick={consultarComprobantes}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-[60vh] mt-4 overflow-hidden shadow-md sm:rounded-lg overflow-x-auto overflow-y-auto border-gray-200 border">
                                    <table className="w-full min-w-full table-fixed">
                                        <thead className="bg-gray-100 sticky top-0 z-10">
                                            <tr className="border-b">
                                                <th
                                                    style={{ width: columnWidths[0] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
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
                                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                            onMouseDown={(e) => handleMouseDown(0, e)}
                                                        />
                                                    </div>
                                                </th>
                                                <th
                                                    style={{ width: columnWidths[1] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                                    onClick={() => orderComprobantes('num')}
                                                >
                                                    <div className='flex px-2 py-2'>
                                                        Num
                                                        {ordenarConfig.key === 'num' && (
                                                            <span className="ml-2">
                                                                {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                                            </span>
                                                        )}
                                                        <div
                                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                            onMouseDown={(e) => handleMouseDown(1, e)}
                                                        />
                                                    </div>
                                                </th>
                                                <th
                                                    style={{ width: columnWidths[2] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"

                                                // onClick={() => orderClientes('codigo')}
                                                >
                                                    <div className='flex px-2 py-2'>
                                                        Descripcion
                                                        {/* {ordenarConfig.key === 'codigo' && (
                                                            <span className="ml-2">
                                                                {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                                            </span>
                                                        )} */}
                                                        <div
                                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                            onMouseDown={(e) => handleMouseDown(2, e)}
                                                        />
                                                    </div>
                                                </th>
                                                <th
                                                    style={{ width: columnWidths[3] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"

                                                // onClick={() => orderClientes('codigo')}
                                                >
                                                    <div className='flex px-2 py-2'>
                                                        Fecha
                                                        {/* {ordenarConfig.key === 'codigo' && (
                                                            <span className="ml-2">
                                                                {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                                            </span>
                                                        )} */}
                                                        <div
                                                            className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                                            onMouseDown={(e) => handleMouseDown(2, e)}
                                                        />
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {loading ? (
                                                <TablaSkeleton columnas={4} />
                                            ) : (
                                                compEmitidos?.length > 0 ? (
                                                    compEmitidos?.map((comp: any, index: number) => (
                                                        <tr onClick={() => selccionarComp(index)} key={index} className={`hover:text-gray-100 hover:bg-indigo-500 hover:cursor-pointer ${comp.seleccionado ? 'bg-indigo-400 text-gray-100' : ''}`}>
                                                            <td className="px-2 py-1 whitespace-nowrap text-sm font-medium border-b border-gray-200 text-ellipsis overflow-hidden">
                                                                {comp.tipo}
                                                            </td>
                                                            <td className="px-2 py-1 whitespace-nowrap text-sm font-medium border border-gray-200 text-ellipsis overflow-hidden">
                                                                {comp.num}
                                                            </td>
                                                            <td className="px-2 py-1 whitespace-nowrap text-sm font-medium border border-gray-200 text-ellipsis overflow-hidden">
                                                                {comp.descrip}
                                                            </td>
                                                            <td className="px-2 py-1 whitespace-nowrap text-sm font-medium border-b border-gray-200 text-ellipsis overflow-hidden">
                                                                {comp.fecha}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3} className="w-full text-center px-2 py-4 text-sm text-gray-500">
                                                            <div className="w-1/6 mx-auto">
                                                                <Image
                                                                    src="/not-found.png"
                                                                    layout="responsive"
                                                                    width={500}
                                                                    height={150}
                                                                    className="flex items-center"
                                                                    alt="Screenshots of the dashboard project showing desktop version"
                                                                />
                                                                No se encontraron comprobantes del cliente numero:{cliente}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center mb-4">
                                <Pagination color="primary"
                                    isCompact
                                    showControls
                                    total={totalPages}
                                    page={pagina}
                                    onChange={setPagina}
                                    initialPage={1}
                                />
                                {solo != 'S' && (
                                    <div className="w-[150px]">
                                        <ButtonCommon
                                            texto={"Confirmar"}
                                            onClick={setComprobantes}
                                            type={"button"}
                                        />
                                    </div>
                                )}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* <Alerta
                abrir={error.mostrar}
                cerrar={cerrarAlerta}
                titulo={error.titulo}
                texto={error.mensaje}
            /> */}

        </>
    )
}