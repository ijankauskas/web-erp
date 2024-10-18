"use client"

import { DbGrabarRecibo } from '@/app/lib/data';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import Alerta from '@/app/ui/erp/alerta';
import Bottom from '@/app/ui/erp/operaciones/recibo/Bottom';
import Cabecera from '@/app/ui/erp/operaciones/recibo/cabecera';
import Tablas from '@/app/ui/erp/operaciones/recibo/tablas';
import Loading from '@/app/ui/Loading';
import { ReciboSchema } from '@/app/validaciones/recibo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
    tipo: string,
    numero: string,
    fecha: string,
    mone: string,
    mone_coti: number,
    num_cliente: string,
    razon_cliente: string,
    compEmitidos: {}[]
    pagos: {}[]
}
const fecha_hoy = new Date().toISOString().split('T')[0];

export default function Recibo() {
    const [cargando, setCargando] = useState(false);
    const [respuesta, setRespuesta] = useState(false);
    const formRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues } = useForm<Inputs>({
        defaultValues: {
            tipo: '',
            numero: '',
            fecha: fecha_hoy,
            mone: 'PES',
            mone_coti: 1,
            num_cliente: '',
            razon_cliente: '',
        },
        resolver: zodResolver(ReciboSchema)
    })

    const [compEmitidos, setCompEmitidos] = useState<{}[]>([]);
    useEffect(() => {
        setValue('compEmitidos', compEmitidos);
    }, [compEmitidos]);

    const [pagos, setPagos] = useState<{}[]>([]);
    useEffect(() => {
        setValue('pagos', pagos);
    }, [pagos]);

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

    const [cliente, setCliente] = useState<any>({})
    const [abrirCompPendConsul, setAbrirCompPendConsul] = useState(false)

    const enviarForm = async (data?: any) => {
        setCargando(false)

        //calculo el total 
        data.total = pagos?.reduce((acc: number, pago: any) => {
            const calculo = pago.importe;
            return acc + parseFloat(calculo.toFixed(2));
        }, 0)

        const response = await DbGrabarRecibo(data)
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

    const abrirCompPend = () => {
        if (!cliente) {
            setMensaje({
                mostrar: true,
                mensaje: 'Debe seleccionar un cliente.',
                titulo: 'Oops...',
                tipo_aletar: 'error',
            });
            return;
        }
        setAbrirCompPendConsul(true)
    }

    const settearComprobantes = (compEmitidos: any) => {
        setCompEmitidos(compEmitidos);
        setAbrirCompPendConsul(false);
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='mx-auto max-w-screen-2xl bg-white'>
                <form ref={formRef} className="space-y-7" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
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
                        />
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <Tablas
                                register={register}
                                setAlerta={setAlerta}
                                cliente={cliente}
                                abrirCompPend={abrirCompPend}
                                abrirCompPendConsul={abrirCompPendConsul}
                                setAbrirCompPendConsul={setAbrirCompPendConsul}
                                settearComprobantes={settearComprobantes}
                                compEmitidos={compEmitidos}
                                pagos={pagos}
                                setPagos={setPagos}
                            />
                        </div>
                    </div>
                    <div className='!m-2'>
                        <Bottom
                            register={register}
                            setAlerta={setAlerta}
                            compEmitidos={compEmitidos}
                            pagos={pagos}
                            errors={errors}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            cliente={cliente}
                        />
                    </div>
                </form>
            </div>

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

            <Loading cargando={cargando} respuesta={respuesta} />
        </Suspense>
    )
}
