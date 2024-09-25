'use client'

import { useRef, useState } from "react";
import InputCommon from "../../../inputCommon";
import { DbConsultarArticulo } from "@/app/lib/data";
import Alerta from "../../alerta";

export default function TablaArticulos({ register, articulos, setAlerta, setArticulos, bloquear }: any) {
    const [columnWidths, setColumnWidths] = useState([150, 400, 100, 125, 125, 100]);
    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
        botonExtra: true,
        textoExtra: '',
        funcionExtra: () => { }
    });

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

    const [nuevoArticulo, setNuevoArticulo] = useState<any>({});

    const manejarCambioNuevoArticulo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNuevoArticulo((prev: any) => ({ ...prev, [id]: value }));
    }

    const consultarArticulo = async (e: any) => {
        e.preventDefault();
        if (nuevoArticulo.codigo == '' || nuevoArticulo.codigo == undefined) return

        const respuesta = await DbConsultarArticulo(nuevoArticulo.codigo, 'N');
        const data = await respuesta.json();

        if (respuesta.ok) {
            // const articulos = Array.isArray(data) ? data : [data];
            const articulos = [{
                codigo: data.codigo,
                descripcion: data.descripcion,
                unidad: data.unidad,
                cantidad: parseFloat(data.cant_default) || 0,
                precio_vta: parseFloat(data.precio_vta) || 0,
                costo_uni: data.costo || 0
            }];

            setAlerta({
                message: `Se agregó el artículo: ${articulos[0].descripcion}`,
                type: "success",
                alertVisible: true
            });

            setArticulos((prev: any) => [...prev, ...articulos]);

        } else {
            setAlerta({
                message: data.message,
                type: "error",
                alertVisible: true
            });
        }
        setNuevoArticulo({ codigo: '', descripcion: '', unidad: '', cantidad: 0 });
    }

    const modificarArticulo = (e: React.ChangeEvent<HTMLInputElement>, index: any, field: string) => {
        const { value } = e.target;

        const valueWithoutSeparators = value.replace(/\./g, '').replace(',', '.');
        const numericValue = isNaN(parseFloat(valueWithoutSeparators)) ? 0 : parseFloat(valueWithoutSeparators);
        setArticulos((prev: any) =>
            prev.map((item: any, idx: number) =>
                idx === index ? { ...item, [field]: numericValue } : item
            )
        );
    };

    const borrarArticulo = (articulo: any, index: any) => {
        setError({
            mostrar: true,
            mensaje: 'Se eliminara como el articulo: ' + articulo.descripcion,
            titulo: 'Estas seguro?',
            icono: 'error-icon',
            botonExtra: true,
            textoExtra: 'Eliminar',
            funcionExtra: () => eliminar(index),
        });
    }

    const eliminar = (index: any) => {
        const nuevosArticulos = articulos.filter((_: any, idx: any) => idx !== index);
        const articulosEliminado = articulos.filter((_: any, idx: any) => idx == index);

        setAlerta({
            message: `Se eliminó el artículo: ${articulosEliminado[0].descripcion}`,
            type: "warning",
            alertVisible: true
        });

        setArticulos(nuevosArticulos);
        cerrarAlerta();
    }

    const cerrarAlerta = () => {
        setError((prev) => ({
            ...prev,
            mostrar: false,
        }));

        setTimeout(() => {
            setError({
                mostrar: false,
                mensaje: '',
                titulo: '',
                icono: '',
                botonExtra: false,
                textoExtra: '',
                funcionExtra: () => { }
            });
        }, 300);
    }

    return (
        <>
            <div className="py-1 min-w-full sm:px-6 lg:px-8 grid grid-cols-1">
                <div className="w-full col-span-1 h-[30.6vh] overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg bg-white border-gray-200 border"> {/* Contenedor con ancho al 100% y overflow */}
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
                                    Cantidad
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(2, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[3] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Precio
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(3, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[4] }} scope="col" className="relative w-[125px] px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden">
                                    Total
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(4, e)}
                                    />
                                </th>
                                <th style={{ width: columnWidths[5] }} scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {articulos?.map((articulo: any, index: number) => (
                                <tr key={index} className={`${articulo.error ? 'bg-red-300' : ''} ${bloquear ? 'bg-yellow-100' : ''}`}>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200 text-ellipsis overflow-hidden">
                                        <InputCommon
                                            tipo={'text'}
                                            id={articulo.codigo}
                                            texto={articulo.codigo}
                                            // useForm={register(articulo.cod_articulo_compo + '-' + index)}
                                            onChange={manejarCambioNuevoArticulo}
                                            paddingY={'py-0.5'}
                                            desactivado={bloquear}
                                        />
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200 text-ellipsis overflow-hidden">
                                        {articulo.descripcion}
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200 text-ellipsis overflow-hidden">
                                        <InputCommon
                                            tipo={'text'}
                                            texto={articulo.cantidad.toLocaleString('es-AR')}
                                            id={`cantidad-${index}`}
                                            useForm={register(`cantidad-${index}`, {
                                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => modificarArticulo(e, index, 'cantidad'),
                                            })}
                                            textAlign={'text-end'}
                                            paddingY={'py-0.5'}
                                            desactivado={bloquear}
                                        />
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200 text-ellipsis overflow-hidden">
                                        <InputCommon
                                            tipo={'text'}
                                            texto={articulo.precio_vta.toLocaleString('es-AR')}
                                            id={`precio_vta-${index}`}
                                            useForm={register(`precio_vta-${index}`, {
                                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => modificarArticulo(e, index, 'precio_vta'),
                                            })}
                                            textAlign={'text-end'}
                                            paddingY={'py-0.5'}
                                            desactivado={bloquear}
                                        />
                                    </td>

                                    <td className="text-end px-3 py-1 whitespace-nowrap text-sm text-gray-900 border border-gray-200 text-ellipsis overflow-hidden">
                                        {(articulo.cantidad * articulo.precio_vta).toLocaleString('es-AR')}
                                    </td>
                                    <td className="w-12 px-6 py-1 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                borrarArticulo(articulo, index);
                                            }}>
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {!bloquear ? (
                                <tr className="border-b">
                                    <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">
                                        <InputCommon
                                            tipo={'text'}
                                            id="codigo"
                                            texto={nuevoArticulo.codigo}
                                            onChange={manejarCambioNuevoArticulo}
                                            funcionOnblur={(e: any) => consultarArticulo(e)}
                                            paddingY={'py-0.5'}
                                        />
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500 border border-gray-200">

                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        <InputCommon
                                            tipo={'number'}
                                            id="cantidad"
                                            textAlign={'text-end'}
                                            paddingY={'py-0.5'}
                                        // texto={nuevoArticuloCompo.cantidad}
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                        />
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        <InputCommon
                                            tipo={'number'}
                                            id="cantidad"
                                            textAlign={'text-end'}
                                            paddingY={'py-0.5'}
                                        // texto={nuevoArticuloCompo.cantidad}
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                        />
                                    </td>
                                    <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500 border border-gray-200">

                                    </td>
                                    <td className="w-12 px-6 py-2 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            ) : (<></>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/*alerta */}
            <Alerta
                abrir={error.mostrar}
                cerrar={cerrarAlerta}
                titulo={error.titulo}
                texto={error.mensaje}
                botonExtra={error.botonExtra}
                textoExtra={error.textoExtra}
                funcionExtra={error.funcionExtra}
            />
        </>
    );
}
