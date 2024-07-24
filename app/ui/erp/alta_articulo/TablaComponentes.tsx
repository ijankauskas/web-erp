import React, { useState } from 'react';
import InputCommon from '../../inputCommon';
import Alerta from '../alerta';
import { DbConsultarArticulo } from '@/app/lib/data';


const TablaComponentes = ({ register, setValue, clearErrors, errors, articulosCompo, setArticulosCompo }: any) => {
    const [nuevoArticuloCompo, setNuevoArticuloCompo] = useState({ codigo: '', descripcion: '', unidad: '', cantidad: 0 });

    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
        botonExtra: true,
        textoExtra: '',
        funcionExtra: () => { }
    });

    const borrarArticulo = (articulo: any) => {
        setError({
            mostrar: true,
            mensaje: 'Se eliminara como articulo componente el articulo: ' + articulo.codigo,
            titulo: 'Estas seguro?',
            icono: 'error-icon',
            botonExtra: true,
            textoExtra: 'Eliminar',
            funcionExtra: () => eliminar(articulo),
        });
    }
    const eliminar = (articulo: any) => {
        const nuevosArticulos = articulosCompo.filter((componente: any) => componente.codigo != articulo.codigo);
        setArticulosCompo(nuevosArticulos);

        console.log(`Articulo con codigo ${articulo.codigo} eliminado`);
        cerrarAlerta();
    }
    const cerrarAlerta = () => {
        setError({
            mostrar: false,
            mensaje: '',
            titulo: '',
            icono: '',
            botonExtra: false,
            textoExtra: '',
            funcionExtra: () => { }
        });
    }
    const manejarCambioNuevoArticulo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNuevoArticuloCompo((prev: any) => ({ ...prev, [id]: value }));
    }

    const manejarAgregarArticulo = () => {
        if (nuevoArticuloCompo.codigo) {
            setArticulosCompo((prev: any) => [...prev, nuevoArticuloCompo]);
            setNuevoArticuloCompo({ codigo: '', descripcion: '', unidad: '', cantidad: 0 });
        }
    }

    const consultarArticulo = async () => {

        const respuesta = await DbConsultarArticulo(nuevoArticuloCompo.codigo);
        const data = await respuesta.json();

        if (respuesta.ok) {
            console.log(data);
            const articulos = Array.isArray(data) ? data : [data];

            setArticulosCompo((prev:any) => [...prev, ...articulos]);
        } else {
            setError({
                mostrar: true,
                mensaje: data.message,
                titulo: 'Oops...',
                icono: 'error-icon',
                botonExtra: false,
                textoExtra: '',
                funcionExtra: () => { },
            });
        }
        setNuevoArticuloCompo({ codigo: '', descripcion: '', unidad: '', cantidad: 0 });
    }

    return (
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Codigo
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Descripcion
                            </th>
                            <th scope="col" className="w-[50px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Unidad
                            </th>
                            <th scope="col" className="w-[50px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Cantidad
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {articulosCompo?.map((articulo: any, index: number) => (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <InputCommon
                                        tipo={'text'}
                                        id={articulo.codigo}
                                        texto={articulo.codigo}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {articulo.descripcion}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {articulo.unidad}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <InputCommon
                                        tipo={'number'}
                                        texto={articulo.cantidad}
                                    />
                                </td>
                                <td className="w-12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            borrarArticulo(articulo);
                                        }}>
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
                                    texto={nuevoArticuloCompo.codigo}
                                    onChange={manejarCambioNuevoArticulo}
                                    funcionOnblur={consultarArticulo}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <InputCommon
                                    tipo={'number'}
                                    id="cantidad"
                                    texto={nuevoArticuloCompo.cantidad}
                                    onChange={manejarCambioNuevoArticulo}
                                />
                            </td>
                            <td className="w-12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    className="text-indigo-600 hover:text-indigo-900"
                                    onClick={manejarAgregarArticulo}
                                >
                                    Agregar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
        </div>
    );
};

export default TablaComponentes;
