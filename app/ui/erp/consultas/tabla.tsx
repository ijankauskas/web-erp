'use client'

import { useState } from "react";
import InputCommon from "../../inputCommon";
import { DbConsultarArticulo } from "@/app/lib/data";

export default function Tabla({ articulos, setAlerta, setArticulos }: any) {
    const [nuevoArticulo, setNuevoArticulo] = useState<any>({});
    const manejarCambioNuevoArticulo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNuevoArticulo((prev: any) => ({ ...prev, [id]: value }));
    }

    const consultarArticulo = async () => {
        if (nuevoArticulo.cod_articulo == '') return

        const respuesta = await DbConsultarArticulo(nuevoArticulo.cod_articulo, 'N');
        let cantidad = nuevoArticulo.cantidad
        const data = await respuesta.json();

        if (respuesta.ok) {
            // const articulos = Array.isArray(data) ? data : [data];
            const articulos = [{
                // cod_articulo: getValues('codigo'),
                codigo: data.codigo,
                descripcion: data.descripcion,
                unidad: data.unidad,
                cantidad: cantidad || 0  // Asegurarse de que cantidad esté presente y tenga un valor predeterminado
            }];

            setArticulos((prev: any) => [...prev, ...articulos]);

        } else {
            setAlerta({
                message: data.message,
                type: "error",
                alertVisible: true
            });
        }
        setNuevoArticulo({ cod_articulo: '', descripcion: '', unidad: '', cantidad: cantidad });
    }

    return (
        <>
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md sm:rounded-lg">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Codigo
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descripcion
                                </th>
                                <th scope="col" className="w-[50px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cantidad
                                </th>
                                <th scope="col" className="w-[125px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {articulos?.map((articulo: any, index: number) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <InputCommon
                                            tipo={'text'}
                                            id={articulo.codigo}
                                            texto={articulo.codigo}
                                            // useForm={register(articulo.cod_articulo_compo + '-' + index)}
                                            onChange={manejarCambioNuevoArticulo}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {articulo.descripcion}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <InputCommon
                                            tipo={'number'}
                                            id="cantidad"
                                        // texto={nuevoArticuloCompo.cantidad}
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <InputCommon
                                            tipo={'number'}
                                            id="cantidad"
                                        // texto={nuevoArticuloCompo.cantidad}
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                        />
                                    </td>
                                    <td className="w-12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <InputCommon
                                        tipo={'text'}
                                        id="codigo"
                                        // texto={nuevoArticuloCompo.cod_articulo_compo}
                                        onChange={manejarCambioNuevoArticulo}
                                        funcionOnblur={consultarArticulo}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <InputCommon
                                        tipo={'number'}
                                        id="cantidad"
                                    // texto={nuevoArticuloCompo.cantidad}
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <InputCommon
                                        tipo={'number'}
                                        id="cantidad"
                                    // texto={nuevoArticuloCompo.cantidad}
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                    />
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
        </>
    );
}
