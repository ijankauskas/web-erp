"use client"

import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RemitoSchema } from '@/app/validaciones/remito';
import Cabecera from '@/app/ui/erp/operaciones/remito/Cabecera';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
import TablaArticulos from '@/app/ui/erp/operaciones/remito/TablaArticulos';
import Alerta from '@/app/ui/erp/alerta';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import ArticulosConsul from '@/app/ui/erp/consultas/articulos_consul';
import Bottom from '@/app/ui/erp/operaciones/remito/Bottom';

const fecha_hoy = new Date().toISOString().split('T')[0];

export default function Factura() {
    const [cargando, setCargando] = useState(false);
    const [respuesta, setRespuesta] = useState(false);
    const [cliente, setCliente] = useState({})
    const [bloquear, setBloquear] = useState(false);
    const [iva, setIva] = useState(0)
    const [abrirArticulosConsul, setAbrirArticulosConsul] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues } = useForm<any>({
        defaultValues: {
            tipo: '',
            numero: '',
            fecha: fecha_hoy,
            mone: 'PES',
            mone_coti: 1,
            num_cliente: '',
            razon_cliente: '',
            articulos: [{
                codigo: '',
                descripcion: '',
                unidad: '',
                cantidad: 0,
                precio_vta: 0
            }],
        },
        resolver: zodResolver(RemitoSchema)
    })
    const [articulos, setArticulos] = useState<{}[]>([]);
    useEffect(() => {
        setValue('articulos', articulos);
    }, [articulos]);

    const [mensaje, setMensaje] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        tipo_aletar: '',
    });
    const cerrarMensaje = () => {
        setMensaje((prev) => ({
            ...prev,
            mostrar: false,
        }));
        setTimeout(() => {
            setMensaje({
                mostrar: false,
                mensaje: '',
                titulo: '',
                tipo_aletar: '',
            });
        }, 300);
    }
    const [alerta, setAlerta] = useState({
        message: "",
        type: "",
        alertVisible: false
    });

    const closeAlertaDismiss = () => {
        setAlerta((prev) => ({
            ...prev,
            alertVisible: false,
        }));

        setTimeout(() => {
            setAlerta({
                message: '',
                type: "",
                alertVisible: false
            });
        }, 300);
    };

    const enviarForm = async (data?: any) => {
        // setCargando(true)
        // if (articulos.length <= 0) {
        //     setMensaje({
        //         mostrar: true,
        //         mensaje: 'No se puede grabar una factura sin articulos.',
        //         titulo: 'Oops...',
        //         tipo_aletar: 'error',
        //     });
        //     return;
        // }

        // const response = await DbGrabartarFactura(data)
        // const mensaje = await response.json();

        // if (response.ok) {
        //     setCargando(false);
        //     setRespuesta(true);
        //     setMensaje({
        //         mostrar: true,
        //         mensaje: mensaje.message,
        //         titulo: 'Operacion Exitosa!',
        //         tipo_aletar: 'exitoso',
        //     });
        //     setBloquear(true);
        //     return
        // } else {
        //     setCargando(false);
        //     setRespuesta(false);
        //     setMensaje({
        //         mostrar: true,
        //         mensaje: mensaje.message,
        //         titulo: 'Oops...',
        //         tipo_aletar: 'error',
        //     });
        //     return
        // }
    }

    const toggleAbrirArticulosConsul = () => {
        setAbrirArticulosConsul(!abrirArticulosConsul)
    }

    const agregarArticulos = (articulo: any) => {
        const nuevo = {
            codigo: articulo.codigo,
            descripcion: articulo.descripcion,
            unidad: articulo.unidad,
            cantidad: articulo.cant_default || 0,
            precio_vta: articulo.precio_vta || 0,
            costo_uni: articulo.costo || 0,
            porcen_iva: articulo.iva == 0 ? 21 : articulo.iva,
        };
        setArticulos((prev: any) => [...prev, nuevo]);
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='mx-auto max-w-screen-2xl bg-white'>
                <form className="space-y-7" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
                    <div className="w-full flex flex-col px-8 pt-2">
                        <Cabecera
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            clearErrors={clearErrors}
                            getValues={getValues}
                            setAlerta={setAlerta}
                            setCliente={setCliente}
                            cliente={cliente}
                            bloquear={bloquear}
                            setIva={setIva}
                        />
                        <div className="w-full flex justify-between my-2">
                            <div>
                                <h2 className='text-xl font-medium leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight'>Articulos</h2>
                            </div>
                            <div className='flex'>
                                <div className='w-[150px]'>
                                    <ButtonCommon type="button" texto={"Buscar Articulos"} onClick={toggleAbrirArticulosConsul} />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <TablaArticulos
                                register={register}
                                articulos={articulos}
                                setAlerta={setAlerta}
                                setArticulos={setArticulos}
                                bloquear={bloquear}
                                iva={iva}
                                cliente={cliente}
                            />
                        </div>
                    </div>
                    <div className='!m-2'>
                        <Bottom
                            register={register}
                            articulos={articulos}
                            setAlerta={setAlerta}
                            setArticulos={setArticulos}
                            // clickLimpiar={clickLimpiar}
                            bloquear={bloquear}
                            iva={iva}
                            errors={errors}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            cliente={cliente}
                            // imprimirComp={imprimirComp}
                            // eliminarComp={eliminarComp}
                        />
                    </div>
                </form>
            </div>

            {abrirArticulosConsul && (
                <ArticulosConsul
                    setArticulo={agregarArticulos}
                    open={abrirArticulosConsul}
                    setOpen={setAbrirArticulosConsul}
                />
            )}

            {/*alerta */}
            <Alerta
                abrir={mensaje.mostrar}
                cerrar={cerrarMensaje}
                titulo={mensaje.titulo}
                texto={mensaje.mensaje}
                tipo_aletar={mensaje.tipo_aletar}
            />

            <DismissibleAlert
                message={alerta.message}
                type={alerta.type}
                onClose={closeAlertaDismiss}
                showPanel={alerta.alertVisible}
            />
        </Suspense>
    )
}