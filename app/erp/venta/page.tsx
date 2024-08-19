"use client"

import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
import Alerta from '@/app/ui/erp/alerta';
import Cabecera from '@/app/ui/erp/compra/cabecera';
import Drawer from '@/app/ui/erp/compra/drawer';
import ArticulosConsul from '@/app/ui/erp/consultas/articulos_consul';
import Tabla from '@/app/ui/erp/venta/tabla';
import InputCommon from '@/app/ui/inputCommon';
import { compraSchema } from '@/app/validaciones/compra';
import { VentaSchema } from '@/app/validaciones/venta';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
    numero: string,
    fecha: string,
    num_cliente: string,
    razon_cliente: string,
    articulos: {
        codigo: string;
        descripcion: string;
        unidad: any;
        cantidad: number;
    }[]
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
            num_cliente: '',
            razon_cliente: '',
            articulos: [{
                codigo: '',
                descripcion: '',
                unidad: '',
                cantidad: 0
            }],
        },
        resolver: zodResolver(VentaSchema)
    })

    const [articulos, setArticulos] = useState<{ error: boolean; codigo: string, descripcion: string, unidad: string, cantidad: string }[]>([]);

    useEffect(() => {
        setValue('articulos', articulos);
    }, [articulos]);

    const formRef = useRef(null);
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
            const articuloAgregado: any = articulos.filter((articulo: any, index: number, self: any[]) =>
                index === self.findIndex((t) => t.codigo === articulo.codigo)
            );
            setAlerta({
                message: `Se agregó el artículo: ${articuloAgregado[0].descripcion}`,
                type: "success",
                alertVisible: true
            });
        } else if (articulos.length < prevArticulos.length) {
            // Se eliminó un artículo
            const articuloEliminado: any = prevArticulos.find((prev: any) => !articulos.some((articulo: any) => articulo.codigo === prev.codigo));
            setAlerta({
                message: `Se eliminó el artículo: ${articuloEliminado.descripcion}`,
                type: "warning",
                alertVisible: true
            });
        }
        prevArticulosRef.current = articulos;
    }, [articulos.length]);

    const mostrarErrorAlerta = () => {
        if (!isInitialMount)
            setError({
                mostrar: true,
                mensaje: 'Error: No se encontró ningun cliente con ese codigo.',
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

    const toggleAbrirArticulosConsul = () => {
        setAbrirArticulosConsul(!abrirArticulosConsul)
    }

    const toggleCabecera = () => {
        setAbrirCabecera(!abrirCabecera)
    }

    const grabar = () => {
        handleSubmit(enviarForm)();
    }

    const enviarForm = (data?: any) => {
        console.log(data);
    }

    return (
        <>
            <form ref={formRef} className="space-y-7" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                {!isLgHidden && (
                    <Drawer abrir={abrirCabecera}
                        toggleAbrir={toggleCabecera}
                        register={register}
                        setValue={setValue}
                        mostrarErrorAlerta={mostrarErrorAlerta}
                        clearErrors={clearErrors}
                        getValues={getValues}
                        grabar={grabar}
                    />
                )}
                <div className="w-full flex flex-col p-8 pt-2">
                    {isLgHidden && (
                        <Cabecera
                            register={register}
                            setValue={setValue}
                            mostrarErrorAlerta={mostrarErrorAlerta}
                            clearErrors={clearErrors}
                            getValues={getValues}
                        />
                    )}
                    <div className="flex justify-end my-2">
                        <div className='w-1/6'>
                            <ButtonCommon type="button" texto={"Agregar Articulo"} onClick={toggleAbrirArticulosConsul} />
                        </div>
                        {!isLgHidden && (
                            <div className='ml-4 w-1/6'>
                                <ButtonCommon type="button" texto={"Mostrar Datos"} onClick={toggleCabecera} />
                            </div>
                        )}
                    </div>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <Tabla
                            register={register}
                            articulos={articulos}
                            setAlerta={setAlerta}
                            setArticulos={setArticulos}
                        />
                    </div>
                </div>
            </form>

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
