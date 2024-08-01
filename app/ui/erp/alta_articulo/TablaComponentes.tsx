import React, { useState } from 'react';
import InputCommon from '../../inputCommon';
import Alerta from '../alerta';
import { DbConsultarArticulo } from '@/app/lib/data';
import DismissibleAlert from '../../DismissAlerta';

const TablaComponentes = ({ register, setValue, clearErrors, errors, articulosCompo, setArticulosCompo,getValues }: any) => {
    const [nuevoArticuloCompo, setNuevoArticuloCompo] = useState({ cod_articulo:'',cod_articulo_compo: '', descripcion: '', unidad: '', cantidad: 0 });

    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
        botonExtra: true,
        textoExtra: '',
        funcionExtra: () => { }
    });

    const [alerta, setAlerta] = useState({
        message: "",
        type: "",
        alertVisible: false
    });

    const closeAlertaDismiss = () => {
        setAlerta({
            message: '',
            type: "",
            alertVisible: false
        });
    };

    const borrarArticulo = (articulo: any) => {
        setError({
            mostrar: true,
            mensaje: 'Se eliminara como articulo componente el articulo: ' + articulo.cod_articulo_compo,
            titulo: 'Estas seguro?',
            icono: 'error-icon',
            botonExtra: true,
            textoExtra: 'Eliminar',
            funcionExtra: () => eliminar(articulo),
        });
    }
    const eliminar = (articulo: any) => {
        const nuevosArticulos = articulosCompo.filter((componente: any) => componente.cod_articulo_compo != articulo.cod_articulo_compo);
        setArticulosCompo(nuevosArticulos);
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

    const modificarCambioNuevoArticulo = (e: React.ChangeEvent<HTMLInputElement>, articulo: any) => {
        const { value } = e.target;
        setArticulosCompo((prev: any) =>
            prev.map((item: any) =>
                item.cod_articulo_compo === articulo.cod_articulo_compo ? { ...item, cantidad: parseFloat(value) } : item
            )
        );
    }

    const consultarArticulo = async () => {
        if (nuevoArticuloCompo.cod_articulo_compo == '') return

        const respuesta = await DbConsultarArticulo(nuevoArticuloCompo.cod_articulo_compo);
        let cantidad = nuevoArticuloCompo.cantidad
        const data = await respuesta.json();

        if (respuesta.ok) {
            // const articulos = Array.isArray(data) ? data : [data];
            const articulos = [{
                cod_articulo: getValues('codigo'),
                cod_articulo_compo: data.codigo,
                descripcion: data.descripcion,
                unidad: data.unidad,
                cantidad: cantidad || 0  // Asegurarse de que cantidad esté presente y tenga un valor predeterminado
            }];

            setArticulosCompo((prev: any) => [...prev, ...articulos]);

        } else {
            setAlerta({
                message: data.message,
                type: "error",
                alertVisible: true
            });
        }
        setNuevoArticuloCompo({cod_articulo:'', cod_articulo_compo: '', descripcion: '', unidad: '', cantidad: cantidad });
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
                            <tr key={index} className={`${articulo.error ? 'bg-red-300' : ''}`}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <InputCommon
                                        tipo={'text'}
                                        id={articulo.cod_articulo_compo}
                                        texto={articulo.cod_articulo_compo}
                                        useForm={register(articulo.cod_articulo_compo + '-' + index)}
                                        onChange={manejarCambioNuevoArticulo}
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
                                        id={articulo.cantidad + '-' + index}
                                        useForm={register(articulo.cantidad + '-' + index, { onChange: (e: React.ChangeEvent<HTMLInputElement>) => modificarCambioNuevoArticulo(e, articulo) })}
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => modificarCambioNuevoArticulo(e, articulo)}
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
                                    id="cod_articulo_compo"
                                    texto={nuevoArticuloCompo.cod_articulo_compo}
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
                                    placeholder="Cod articulo"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => manejarCambioNuevoArticulo(e)}
                                />
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

            {alerta.alertVisible && (
                <DismissibleAlert
                    message={alerta.message}
                    type={alerta.type}
                    onClose={closeAlertaDismiss}
                />
            )}
        </div>
    );
};

export default TablaComponentes;