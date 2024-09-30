"use client"

import { DbConsultarNotaCredito, DbGrabarNotaCredito } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
import Alerta from '@/app/ui/erp/alerta';
import ArticulosConsul from '@/app/ui/erp/consultas/articulos_consul';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ClientesConsul from '@/app/ui/erp/consultas/Clientes_consul';
import Cabecera from '@/app/ui/erp/operaciones/nota_credito/Cabecera';
import TablaArticulos from '@/app/ui/erp/operaciones/nota_credito/TablaArticulos';
import Bottom from '@/app/ui/erp/operaciones/nota_credito/Bottom';
import { NotaCreditoSchema } from '@/app/validaciones/NotaCredito';
import CompPendiente from '@/app/ui/erp/consultas/CompPendientes';
import Loading from '@/app/ui/Loading';


type Inputs = {
    tipo: string,
    numero: string,
    fecha: string,
    mone: string,
    mone_coti: number,
    num_cliente: string,
    razon_cliente: string,
    articulos: {
        codigo: string;
        descripcion: string;
        unidad: any;
        cantidad: number;
        precio_vta: number;
        costo_uni: number;
    }[]
}

const fecha_hoy = new Date().toISOString().split('T')[0];

export default function NotaCredito() {
    const [cargando, setCargando] = useState(false);
    const [respuesta, setRespuesta] = useState(false);
    const [bloquear, setBloquear] = useState(false); //para bloquear los inputs cuando consultas el comprobante
    const [abrirArticulosConsul, setAbrirArticulosConsul] = useState(false);
    const [abrirClientesConsul, setAbrirClientesConsul] = useState(false);
    const [abrirCompPend, setAbrirCompPend] = useState(false);
    const [iva, setIva] = useState(0)
    const [cliente, setCliente] = useState({})

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
        resolver: zodResolver(NotaCreditoSchema)
    })
    const [articulos, setArticulos] = useState<{
        error: boolean; codigo: string, descripcion: string, unidad: string, cantidad: number, precio_vta: number, costo_uni: number
    }[]>([]);

    useEffect(() => {
        setValue('articulos', articulos);
    }, [articulos]);

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

    const toggleAbrirArticulosConsul = () => {
        setAbrirArticulosConsul(!abrirArticulosConsul)
    }
    const toggleAbrirClientesConsul = () => {
        setAbrirClientesConsul(!abrirClientesConsul)
    }
    const toggleAbrirCompPend = () => {
        setAbrirCompPend(!abrirCompPend)
    }

    const enviarForm = async (data?: any) => {
        setCargando(true)
        if (articulos.length <= 0) {
            setMensaje({
                mostrar: true,
                mensaje: 'No se puede grabar una nota de credito sin articulos.',
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

        const response = await DbGrabarNotaCredito(data)
        const mensaje = await response.json();

        if (response.ok) {
            setCargando(false);
            setRespuesta(true);
            setMensaje({
                mostrar: true,
                mensaje: mensaje.message,
                titulo: 'Operacion Exitosa!',
                tipo_aletar: 'exitoso',
            });
            setBloquear(true);
            return
        } else {
            setCargando(false);
            setRespuesta(false);
            setMensaje({
                mostrar: true,
                mensaje: mensaje.message,
                titulo: 'Oops...',
                tipo_aletar: 'error',
            });
            return
        }
    }

    const consultarComprobante = async (tipo: string, num: number) => {
        setCargando(true)
        try {
            const response = await DbConsultarNotaCredito(tipo, num)
            const data = await response.json();

            if (response.ok) {
                setBloquear(true)
                setValue('tipo', data.tipo)
                setValue('numero', data.num)
                // setValue('fecha', data.fecha.toISOString().split('T')[0])
                setValue('mone', data.mone)
                setValue('mone_coti', data.mone_coti)
                setCliente({ id: data.cliente, cateIva: data.cate_iva })
                setValue('num_cliente', data.cliente)
                setValue('razon_cliente', data.clientes.razon)
                setArticulos([])
                data.articulos.map((articulo: any) => {
                    const articulos = [{
                        codigo: articulo.articulo,
                        descripcion: articulo.articuloDatos.descripcion,
                        unidad: articulo.unidad,
                        cantidad: parseFloat(articulo.cant) || 0,
                        precio_vta: parseFloat(articulo.precio) || 0,
                        costo_uni: articulo.costo || 0
                    }];
                    setArticulos((prev: any) => [...prev, ...articulos]);
                })
                setCargando(false);
                setRespuesta(true);
            } else {
                setCargando(false);
                setRespuesta(false);
                setBloquear(false)
                limpiar();
                setAlerta({
                    message: data.message,
                    type: "error",
                    alertVisible: true
                });
            }
        } catch (error: any) {
            setCargando(false);
            setRespuesta(false);
            setAlerta({
                message: error.Error,
                type: "error",
                alertVisible: true
            });
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

    const agregarArticulos = (articulo: any) => {
        const nuevo = {
            codigo: articulo.codigo,
            descripcion: articulo.descripcion,
            unidad: articulo.unidad,
            cantidad: articulo.cant_default || 0,
            precio_vta: articulo.precio_vta || 0,
            costo_uni: articulo.costo || 0
        };
        setArticulos((prev: any) => [...prev, nuevo]);
    }

    const clickLimpiar = async () => {
        setValue('tipo', '')
        setValue('numero', '')
        limpiar()
    }

    const limpiar = async () => {

        setBloquear(false)
        setValue('fecha', fecha_hoy)
        setValue('mone', '')
        setValue('mone_coti', 0)
        setCliente({})
        setValue('num_cliente', '')
        setValue('razon_cliente', '')
        setArticulos([])

    }

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
                        consultarComprobante={consultarComprobante}
                        AbrirClientesConsul={toggleAbrirClientesConsul}
                        bloquear={bloquear}
                        setIva={setIva}
                        setCliente={setCliente}
                        cliente={cliente}
                    />
                    <div className="w-full flex justify-between my-2">
                        <div>
                            <h2 className='text-xl font-medium leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight'>Articulos</h2>
                        </div>
                        <div className='flex'>
                            <div className='w-[150px] sm:mr-4'>
                                <ButtonCommon type="button" texto={"Buscar Articulos"} onClick={toggleAbrirArticulosConsul} />
                            </div>
                            <div className='w-[40px]'>
                                <ButtonCommon type="button" tooltip="Facturas Pendientes" texto="FC" onClick={toggleAbrirCompPend} />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <TablaArticulos
                            register={register}
                            articulos={articulos}
                            setAlerta={setAlerta}
                            setArticulos={setArticulos}
                            iva={iva}
                            cliente={cliente}
                            bloquear={bloquear}
                        />
                    </div>
                </div>
                <div className='!m-2'>
                    <Bottom
                        register={register}
                        articulos={articulos}
                        setAlerta={setAlerta}
                        setArticulos={setArticulos}
                        clickLimpiar={clickLimpiar}
                        bloquear={bloquear}
                        iva={iva}
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        cliente={cliente}
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
                setArticulo={agregarArticulos}
                open={abrirArticulosConsul}
                setOpen={setAbrirArticulosConsul}
            />

            <CompPendiente
                open={abrirCompPend}
                setOpen={setAbrirCompPend}
            />

            <DismissibleAlert
                message={alerta.message}
                type={alerta.type}
                onClose={closeAlertaDismiss}
                showPanel={alerta.alertVisible}
            />

            <Loading cargando={cargando} respuesta={respuesta} />

        </div>
    );


}
