'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import InputCommon from "../../inputCommon";
import ButtonCommon from "../ButtonCommon";
import { DbConsultarArticulo } from "@/app/lib/data";
import { SetStateAction, useState } from "react";
import Alerta from "../alerta";

export default function ArticulosConsul({ setArticulo, open, setOpen }: any) {
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

    const [articulos, setArticulos] = useState<[]>([]);

    const [sCodarticulos, setSCodarticulos] = useState('');
    const settearSCodarticulos = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSCodarticulos(e.target.value);
    }
    const [sDescrip, setSDescrip] = useState('');
    const settearSDescrip = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSDescrip(e.target.value);
    }

    const consultar = async () => {
        const respuesta = await DbConsultarArticulo(sCodarticulos, 'S',sDescrip);
        const data = await respuesta.json();

        if (respuesta.ok) {
            setArticulos(data)
        } else {
            setError({
                mostrar: true,
                mensaje: data.message,
                titulo: 'Oops...',
                icono: 'error-icon',
            });
        }
    }

    const agregarArticulo = ({articulo}:any) => {
        
        const nuevo = {
            codigo: articulo.codigo,
            descripcion: articulo.descripcion,
            unidad: articulo.unidad,
            cantidad: articulo.cantidad || 0,
            precio_vta: articulo.precio_vta || 0
        };

        setArticulo((prev: any) => [...prev, nuevo]);
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
                                <div className="h-[60vh] mt-4 w-full overflow-hidden shadow-md sm:rounded-lg">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr className="border-b">
                                                <th scope="col" className="w-[50px] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                                    Codigo
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Descripcion
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {articulos?.map((articulo: any, index: number) => (
                                                <tr onClick={()=>agregarArticulo({articulo})} className="border-b text-gray-900 hover:text-gray-100 hover:bg-indigo-500 hover:cursor-pointer ">
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border-r border-gray-200">
                                                        {articulo.codigo}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm border-l border-gray-200">
                                                        {articulo.descripcion}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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