import React, { useState } from 'react';
import InputCommon from '../../inputCommon';
import Alerta from '../alerta';

const initialComponentes = [
    {
        codigo: 'codigo 1',
        descripcion: 'Descripcion articulo 1',
        unidad: 'Litros',
        cantidad: 4,
    },
    {
        codigo: 'codigo 2',
        descripcion: 'Descripcion articulo 1',
        unidad: 'Litros',
        cantidad: 4,
    },
    {
        codigo: 'codigo 3',
        descripcion: 'Descripcion articulo 1',
        unidad: 'Litros',
        cantidad: 4,
    },
]

const TablaComponentes = ({ register, setValue, clearErrors, errors }: any) => {
    const [componentes, setComponentes] = useState(initialComponentes);
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
        const nuevosArticulos = componentes.filter(componente => componente.codigo != articulo.codigo);
        setComponentes(nuevosArticulos);
        
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
                        {componentes.map((articulo: any, index: number) => (
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
                        {/* More rows... */}
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
