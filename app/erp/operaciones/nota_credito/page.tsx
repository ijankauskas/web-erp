"use client"

import { DbGrabartarFactura } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
import Alerta from '@/app/ui/erp/alerta';
import ArticulosConsul from '@/app/ui/erp/consultas/articulos_consul';
import { VentaSchema } from '@/app/validaciones/venta';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ClientesConsul from '@/app/ui/erp/consultas/Clientes_consul';
import Cabecera from '@/app/ui/erp/operaciones/nota_credito/Cabecera';
import TablaArticulos from '@/app/ui/erp/operaciones/nota_credito/TablaArticulos';
import Bottom from '@/app/ui/erp/operaciones/nota_credito/Bottom';


type Inputs = {
    tipo: string,
    numero: string,
    fecha: string,
    mone: string,
    num_cliente: string,
    razon_cliente: string,
    articulos: {
        codigo: string;
        descripcion: string;
        unidad: any;
        cantidad: number;
        precio_vta: number;
        costo_uni: number;
    }[],
    pagos: {
        id: string;
        name: string;
        importe: number;
    }[]
}

const fecha_hoy = new Date().toISOString().split('T')[0];

export default function NotaCredito() {
    const [cargando, setCargando] = useState(false);
    const [abrirArticulosConsul, setAbrirArticulosConsul] = useState(false);
    const [abrirClientesConsul, setAbrirClientesConsul] = useState(false);

    const [mensaje, setMensaje] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        tipo_aletar: '',
    });
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues } = useForm<Inputs>({
        defaultValues: {
            tipo: '',
            numero: '',
            fecha: fecha_hoy,
            mone: 'PES',
            num_cliente: '0',
            razon_cliente: '',
            articulos: [{
                codigo: '',
                descripcion: '',
                unidad: '',
                cantidad: 0,
                precio_vta: 0
            }],
        },
        resolver: zodResolver(VentaSchema)
    })
    const [articulos, setArticulos] = useState<{
        error: boolean; codigo: string, descripcion: string, unidad: string, cantidad: number, precio_vta: number, costo_uni: number
    }[]>([]);

    useEffect(() => {
        setValue('articulos', articulos);
    }, [articulos]);

    const [pagos, setPagos] = useState<{
        error: boolean; id: string, name: string, importe: number
    }[]>([]);

    useEffect(() => {
        setValue('pagos', pagos);
    }, [pagos]);

    const formRef = useRef(null);

    const cerrarMensaje = () => {
        setMensaje({
            mostrar: false,
            mensaje: '',
            titulo: '',
            tipo_aletar: '',
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
            const articuloEliminado: any = articulos.filter((articulo: any, index: number, self: any[]) =>
                index === self.findIndex((t) => t.codigo === articulo.codigo)
            );
            setAlerta({
                message: `Se eliminó el artículo: ${articuloEliminado[0].descripcion}`,
                type: "warning",
                alertVisible: true
            });
        }
        prevArticulosRef.current = articulos;
    }, [articulos.length]);

    const toggleAbrirArticulosConsul = () => {
        setAbrirArticulosConsul(!abrirArticulosConsul)
    }
    const toggleAbrirClientesConsul = () => {
        setAbrirClientesConsul(!abrirClientesConsul)
    }

    const enviarForm = async (data?: any) => {
        if (articulos.length <= 0) {
            setMensaje({
                mostrar: true,
                mensaje: 'No se puede grabar una factura sin articulos.',
                titulo: 'Oops...',
                tipo_aletar: 'error',
            });
            return;
        }
        //limpia los errores 
        articulos.map(articulo => articulo.error = false)

        //calculo el total 
        data.total = articulos?.reduce((acc: number, articulo: any) => {
            const calculo = (articulo.precio_vta * articulo.cantidad);
            return acc + parseFloat(calculo.toFixed(2));
        }, 0)

        //calculo el costo total 
        data.total_costo = articulos?.reduce((acc: number, articulo: any) => {
            const calculo = (articulo.costo_uni * articulo.cantidad);
            return acc + parseFloat(calculo.toFixed(2));
        }, 0)

        const response = await DbGrabartarFactura(data)
        const mensaje = await response.json();

        if (response.ok) {
            setCargando(false);
            setMensaje({
                mostrar: true,
                mensaje: mensaje.message,
                titulo: 'Operacion Exitosa!',
                tipo_aletar: 'exitoso',
            });
            return
        } else {
            setCargando(false);
            setMensaje({
                mostrar: true,
                mensaje: mensaje.message,
                titulo: 'Oops...',
                tipo_aletar: 'error',
            });
            return
        }
    }

    useEffect(() => {
        if (!errors || !errors.articulos || !Array.isArray(errors.articulos)) {
            return; // No hay errores que mostrar
        }
        const errorIndices = new Set(errors.articulos.map((e, index) => index));

        setArticulos((prevObjetos) =>
            prevObjetos.map((obj, index) => ({
                ...obj,
                error: errorIndices.has(index),
            }))
        );

        let mensaje: string = '';

        if (errors.articulos.length > 0) {

            errors.articulos.map((error, index) => {
                mensaje += error.cantidad.message + '\n\n'
            });
        }
        setMensaje({
            mostrar: true,
            mensaje: mensaje,
            titulo: 'O  ops...',
            tipo_aletar: 'error',
        });

        clearErrors();

    }, [errors]);


    return (
        <div className='mx-auto max-w-screen-2xl bg-white'>
            <form ref={formRef} className="space-y-7" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                <div className="w-full flex flex-col px-8 pt-2">
                    <Cabecera
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        setMensaje={setMensaje}
                        clearErrors={clearErrors}
                        getValues={getValues}
                        AbrirClientesConsul={toggleAbrirClientesConsul}
                    />
                    <div className="w-full flex justify-between my-2">
                        <div>
                            <h2 className='text-xl font-medium leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight'>Articulos</h2>
                        </div>
                        <div className='flex'>
                            <div className='w-[150px] sm:mr-4'>
                                <ButtonCommon type="button" texto={"Buscar Articulos"} onClick={toggleAbrirArticulosConsul} />
                            </div>
                            <div className='w-[150px]'>
                                <ButtonCommon type="submit" texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Guardar</>} />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <TablaArticulos
                            register={register}
                            articulos={articulos}
                            setAlerta={setAlerta}
                            setArticulos={setArticulos}
                        />
                    </div>
                </div>
                <div className='!m-2'>
                    <Bottom
                        register={register}
                        articulos={articulos}
                        setAlerta={setAlerta}
                        setArticulos={setArticulos}
                        pagos={pagos}
                        setPagos={setPagos}
                    />
                </div>
            </form>

            {/*alerta */}
            <Alerta
                abrir={mensaje.mostrar}
                cerrar={cerrarMensaje}
                titulo={mensaje.titulo}
                texto={mensaje.mensaje}
                tipo_aletar={mensaje.tipo_aletar}
            />

            <ArticulosConsul
                setArticulo={setArticulos}
                open={abrirArticulosConsul}
                setOpen={setAbrirArticulosConsul}
            />

            <ClientesConsul
                setArticulo={setArticulos}
                open={abrirClientesConsul}
                setOpen={setAbrirClientesConsul}
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


}
