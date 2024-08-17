"use client"

import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
import Alerta from '@/app/ui/erp/alerta';
import Cabecera from '@/app/ui/erp/compra/cabecera';
import Drawer from '@/app/ui/erp/compra/drawer';
import Tabla from '@/app/ui/erp/compra/tabla';
import ArticulosConsul from '@/app/ui/erp/consultas/articulos_consul';
import InputCommon from '@/app/ui/inputCommon';
import { compraSchema } from '@/app/validaciones/compra';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
    numero: string,
    fecha: string,
    fechaVenci: string,
    fechaPago: string,
    codProveedor: string,
    razonProveedor: string,
}

export default function alta_articulo() {
    const [cargando, setCargando] = useState(false);
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [abrirCabecera, setAbrirCabecera] = useState(false);
    const [abrirArticulosConsul, setAbrirArticulosConsul] = useState(false);
    const [isLgHidden, setIsLgHidden] = useState(false);
    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
    });
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues } = useForm<Inputs>({
        defaultValues: {
            numero: '',
            fecha: '',
            fechaVenci: '',
            fechaPago: '',
            codProveedor: '',
            razonProveedor: '',
        },
        resolver: zodResolver(compraSchema)
    })
    const [articulos, setArticulos] = useState<{}[]>([]);
    const cerrarAlerta = () => {
        setError({
            mostrar: false,
            mensaje: '',
            titulo: '',
            icono: '',
        });
    }
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

    useEffect(() => {
        const handleResize = () => {
            setIsLgHidden(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const prevArticulosRef = useRef(articulos);
    useEffect(() => {
        const prevArticulos = prevArticulosRef.current;

        if (articulos.length > prevArticulos.length) {
            // Se agregó un artículo
            const articuloAgregado:any = articulos.find((articulo):any => !prevArticulos.some((prev:any) => prev.codigo === articulo.codigo));

            setAlerta({
                message: `Se agregó el artículo: ${articuloAgregado.descripcion}`,
                type: "success",
                alertVisible: true
            });
        } else if (articulos.length < prevArticulos.length) {
            // Se eliminó un artículo
            const articuloEliminado:any = prevArticulos.find(prev => !articulos.some(articulo => articulo.id === prev.id));
            setAlerta({
                message: `Se eliminó el artículo: ${articuloEliminado.descripcion}`,
                type: "warning",
                alertVisible: true
            });
        }

        // Actualizar la referencia con el estado actual
        prevArticulosRef.current = articulos;
    }, [articulos]);

    const mostrarErrorAlerta = () => {
        if (!isInitialMount)
            setError({
                mostrar: true,
                mensaje: 'Error: No se encontró ningun proveedor con ese codigo.',
                titulo: 'Oops...',
                icono: 'error-icon',
            });
    }

    useEffect(() => {
        if (isInitialMount) {
            setIsInitialMount(false);
            return;
        }
    });


    const toggleCabecera = () => {
        setAbrirCabecera(!abrirCabecera)
    }

    return (
        <>
            {!isLgHidden && (
                <Drawer abrir={abrirCabecera}
                    toggleAbrir={toggleCabecera}
                    register={register}
                    setValue={setValue}
                    mostrarErrorAlerta={mostrarErrorAlerta}
                    clearErrors={clearErrors}
                    getValues={getValues} />
            )}
            <div className="w-full flex flex-col p-8 pt-2">
                {isLgHidden && (
                    <Cabecera
                        register={register}
                        setValue={setValue}
                        mostrarErrorAlerta={mostrarErrorAlerta}
                        clearErrors={clearErrors}
                        getValues={getValues} />
                )}
                <div className="flex justify-end my-2">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setAbrirArticulosConsul(true)}
                    >
                        Agregar Articulo
                    </button>
                    {!isLgHidden && (
                        <div className='ml-4'>
                            <ButtonCommon texto={"Mostrar Datos"} onClick={toggleCabecera} />
                        </div>
                    )}
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <Tabla articulos={articulos} setAlerta={setAlerta} setArticulos={setArticulos}/>
                </div>
            </div>

            {/*alerta */}
            <Alerta
                abrir={error.mostrar}
                cerrar={cerrarAlerta}
                titulo={error.titulo}
                texto={error.mensaje}
            />

            <ArticulosConsul
                setArticulo={setArticulos}
                open={abrirArticulosConsul}
                setOpen={setAbrirArticulosConsul}
            />

            {alerta.alertVisible && (
                <DismissibleAlert
                    message={alerta.message}
                    type={alerta.type}
                    onClose={closeAlertaDismiss}
                />
            )}
        </>
    );


}
