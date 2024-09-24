'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import InputCommon from "../../inputCommon";
import ButtonCommon from "../ButtonCommon";
import { DbConsultarArticulo } from "@/app/lib/data";
import { SetStateAction, useEffect, useState } from "react";
import Alerta from "../alerta";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Pagination } from "@nextui-org/react";

export default function ArticulosConsul({ setArticulo, open, setOpen }: any) {
    const [columnWidths, setColumnWidths] = useState([50, 500]);
    const [articulos, setArticulos] = useState<[]>([]);
    const [sCodarticulos, setSCodarticulos] = useState('');
    const [sDescrip, setSDescrip] = useState('');
    const [pagina, setPagina] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalxPagina, setTotalxPagina] = useState(50);
    const [ordenarConfig, setOrdenarConfig] = useState({ key: 'razon', direction: 'asc' });

    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
    });
    const cerrarAlerta = () => {
        setError({
            mostrar: false,
            mensaje: '',
            titulo: '',
            icono: '',
        });
    }

    useEffect(() => {
        cargarComponente();
    }, []);

    async function cargarComponente() {
        const respuesta = await DbConsultarArticulo(sCodarticulos, 'S', sDescrip, 'descripcion', 'asc', 1, 5, 'S', 'S');
        const data = await respuesta.json();
        if (!respuesta.ok) {
            throw new Error('Error al cargar los articulos');
        }
        setArticulos(data.articulos);

        let total = data.total
        setTotalPages(Math.ceil(total / totalxPagina));
    }

    const settearSCodarticulos = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSCodarticulos(e.target.value);
    }
    const settearSDescrip = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSDescrip(e.target.value);
    }

    const consultar = async () => {
        const respuesta = await DbConsultarArticulo(sCodarticulos, 'S', sDescrip, ordenarConfig.key, ordenarConfig.direction, pagina, 50, 'S', 'N');
        const data = await respuesta.json();
        if (respuesta.ok) {
            console.log(data);

            setArticulos(data.articulos);
        } else {
            setError({
                mostrar: true,
                mensaje: data.message,
                titulo: 'Oops...',
                icono: 'error-icon',
            });
        }
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

    const orderArticulos = (key: any) => {
        let direction = 'asc';
        if (ordenarConfig.key === key && ordenarConfig.direction === 'asc') {
            direction = 'desc';
        }
        setPagina(1);
        setOrdenarConfig({ key, direction });
    };

    const agregarArticulo = ({ articulo }: any) => {
        const nuevo = {
            codigo: articulo.codigo,
            descripcion: articulo.descripcion,
            unidad: articulo.unidad,
            cantidad: articulo.cant_default || 0,
            precio_vta: articulo.precio_vta || 0,
            costo_uni: articulo.costo || 0
        };
        setArticulo((prev: any) => [...prev, nuevo]);
    }

    useEffect(() => {
        consultar();
    }, [ordenarConfig]);

    useEffect(() => {
        consultar();
    }, [pagina]);

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
                                    <DialogTitle className="text-lg font-medium text-gray-900">Consulta de Artículos.</DialogTitle>
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
                                <div className="pt-2 grid grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-12">
                                    <div className="sm:col-span-2 col-span-2 flex items-center">
                                        <div className='w-full'>
                                            <InputCommon
                                                titulo={'Codigo'}
                                                onChange={settearSCodarticulos}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4 col-span-4 flex items-center">
                                        <div className='w-full'>
                                            <InputCommon
                                                titulo={'Descripcion'}
                                                onChange={settearSDescrip}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 col-span-2 flex items-end">
                                        <div className='w-full mr-2'>
                                            <ButtonCommon texto={'Buscar'} onClick={consultar} type={'button'} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-[60vh] mt-4 overflow-hidden shadow-md sm:rounded-lg overflow-x-auto overflow-y-auto">
                                    <table className="w-full min-w-full table-fixed">
                                        <thead className="bg-gray-100 sticky top-0 z-10">
                                            <tr className="border-b">
                                                <th
                                                    style={{ width: columnWidths[0] }}
                                                    scope="col"
                                                    className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                                    onClick={() => orderArticulos('codigo')}
                                                >
                                                    <div className='flex px-2 py-2'>
                                                        Codigo
                                                        {ordenarConfig.key === 'codigo' && (
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
                                                    onClick={() => orderArticulos('descripcion')}
                                                >
                                                    <div className='flex px-2 py-2'>
                                                        Descripcion
                                                        {ordenarConfig.key === 'descripcion' && (
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
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {articulos?.map((articulo: any, index: number) => (
                                                <tr key={index} onClick={() => agregarArticulo({ articulo })} className="border-b text-gray-900 hover:text-gray-100 hover:bg-indigo-500 hover:cursor-pointer ">
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border border-gray-200">
                                                        {articulo.codigo}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border border-gray-200">
                                                        {articulo.descripcion}
                                                    </td>
                                                </tr>
                                            ))}
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
                                />
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <Alerta
                abrir={error.mostrar}
                cerrar={cerrarAlerta}
                titulo={error.titulo}
                texto={error.mensaje}
            />

        </>
    )
}