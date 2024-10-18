'use client'
import { useEffect, useState } from "react";
import ComboBoxSelect from "../../../ComboBoxSelect";
import InputCommon from "../../../inputCommon";
import { DbCompConsul, DbConsultarCliente, DbMonedasConsul } from "@/app/lib/data";
import ButtonCommon from "../../ButtonCommon";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ClientesConsul from "../../consultas/Clientes_consul";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Cabecera({ register, setValue, clearErrors, errors, setMensaje, getValues, consultarComprobante, bloquear, setIva, cliente, setCliente, setCompro_elec }: any) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [clientes, setClientes] = useState<any>([]);
    const [monedas, setMonedas] = useState([]);
    const [moneDefault, setMoneDefault] = useState('PES');
    const [comp, setComp] = useState([]);
    const [abrirClientesConsul, setAbrirClientesConsul] = useState(false);


    useEffect(() => {
        cargarComponente()
    }, [])

    function cargarComponente() {
        consutlarClientes('');
        consultarMonedas();
        consultarComp();

    }

    const seleccionarClienteSelec = (cliente: any) => {
        let clienteSelect = clientes.filter((item: any) => item.id == cliente)
        setCliente(clienteSelect)
        setValue('num_cliente', cliente);
        clearErrors('num_cliente');
    }

    const seleccionarMoneSelec = (moneda: any) => {
        const mone_coti: any = monedas.filter((mone: any) => mone.id == moneda);
        if (mone_coti.length > 0) {
            setValue('mone_coti', mone_coti[0].mone_coti);
        }
        setValue('mone', moneda);
        clearErrors('mone');
    }

    const seleccionarCompSelec = (compSelect: any) => {
        const params = new URLSearchParams(searchParams);
        let tipo: string | null = compSelect;
        if (tipo) {
            params.set('tipo', tipo);
            replace(`${pathname}?${params.toString()}`);
            //elimina el num para que no consulte de mas
            params.delete('num');
            replace(`${pathname}?${params.toString()}`);
            clearErrors()
        } else {
            params.delete('tipo');
            replace(`${pathname}?${params.toString()}`);
            clearErrors();
            return
        }

        const prox_num: any = comp.filter((comp: any) => comp.id == compSelect);
        if (prox_num.length > 0) {
            setValue('numero', prox_num[0].prox_num);
        }
        setIva(prox_num[0].porcentaje)
        setCompro_elec(prox_num[0].compro_elec)
        setValue('tipo', compSelect);
        setValue('cate_iva', prox_num[0].porcentaje);
        clearErrors('tipo');
    }

    const consultarClientesPorCodigo = async (cliente: any) => {
        if (cliente.target.value == '') return
        const respuesta = await DbConsultarCliente(cliente.target.value);
        const data = await respuesta.json();

        if (respuesta.ok) {
            setClientes([{ id: data.codigo, name: data.razon, cateIva: data.cate_iva }])
        } else {
            setMensaje({
                mostrar: true,
                mensaje: data.message,
                titulo: 'Oops...',
                tipo_aletar: 'error',
            });
        }
        setCliente({ id: data.codigo, name: data.razon, cateIva: data.cate_iva })
        setValue('num_cliente', cliente.target.value);
    }

    const consutlarClientes = async (param?: any) => {

        const respuesta = await DbConsultarCliente(null, 'S', param, 'razon', 'asc', 1, '50', 'S');
        const data = await respuesta.json();
        if (respuesta.ok) {
            const clientesMapeados = data.map((cliente: any) => ({
                id: cliente.codigo || '',
                name: cliente.razon || '',
            }));
            setClientes(clientesMapeados);
        }
    }

    const consultarMonedas = async () => {
        const respuesta = await DbMonedasConsul();
        const data = await respuesta.json();
        if (respuesta.ok) {
            const MonedasMapeados = data.map((mone: any) => ({
                id: mone.mone || '',
                name: mone.mone || '',
                mone_coti: mone.mone_coti || 0,
            }));
            setMonedas(MonedasMapeados);
        }
    }

    const consultarComp = async () => {
        const respuesta = await DbCompConsul('S', 'C');
        const data = await respuesta.json();
        if (respuesta.ok) {
            const CompMapeados = data.map((comp: any) => ({
                id: comp.tipo || '',
                name: comp.descrip || '',
                prox_num: comp.prox_num.toString() || 1,
                porcentaje: comp.porcentaje || 0,
                compro_elec: comp.compro_elec || 'N',
            }));
            setComp(CompMapeados);
        }
    }

    const toggleAbrirClientesConsul = () => {
        setAbrirClientesConsul(!abrirClientesConsul)
    }

    const seleccionarCliente = (cliente: any) => {
        setClientes([{ id: cliente.codigo, name: cliente.razon, cateIva: cliente.cateIva }])
        setCliente({ id: cliente.codigo, name: cliente.razon, cateIva: cliente.cateIva })

        setValue('num_cliente', cliente.codigo);
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        let tipo: string | null = params.get('tipo');
        let num: string | null = params.get('num');
        if ((tipo != '' && tipo != null) && (num != '' && num != null)) {
            consultarComprobante(tipo, num);
        }
    }, [searchParams]);

    const consultar = () => {
        const params = new URLSearchParams(searchParams);
        let numero: string | null = getValues('numero');
        if (numero) {
            params.set('num', numero);
            replace(`${pathname}?${params.toString()}`);
            clearErrors()
        } else {
            params.delete('num');
            replace(`${pathname}?${params.toString()}`);
            clearErrors();
            return
        }
        let tipo: string | null = params.get('tipo')

        if (tipo) {
            let compFilter: any = comp.filter((comp: any) => comp.id == tipo)
            if (compFilter[0].prox_num != numero)
                consultarComprobante(tipo, numero);
        }
    }
    return (
        <>
            <div className="pt-2 grid gap-x-2 gap-y-0 grid-cols-10">
                <div className="col-span-6 sm:col-span-6 md:col-span-2 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <ComboBoxSelect
                            titulo={"Tipo"}
                            data={comp}
                            seleccionado={getValues('tipo')}
                            setearCodigo={seleccionarCompSelec}
                            error={errors.tipo?.message}
                            desactivado={bloquear}
                        />
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-6 md:col-span-2 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <InputCommon
                            titulo={"Numero"}
                            tipo={'number'}
                            error={errors.numero?.message}
                            placeholder={"Numero de la factura"}
                            useForm={register("numero", { onBlur: consultar })}
                            desactivado={bloquear}
                        />
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-6 md:col-span-2 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <InputCommon
                            titulo={"Fecha"}
                            tipo={'date'}
                            error={errors.fecha?.message}
                            placeholder={""}
                            useForm={register("fecha")}
                            desactivado={bloquear}
                        />
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-6 md:col-span-2 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <ComboBoxSelect
                            titulo={"Moneda"}
                            data={monedas}
                            seleccionado={getValues('mone') ? getValues('mone') : moneDefault}
                            setearCodigo={seleccionarMoneSelec}
                            error={errors.mone?.message}
                            desactivado={bloquear}
                        />
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-6 md:col-span-2 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <InputCommon
                            titulo={"Cotizacion"}
                            tipo={'number'}
                            useForm={register("mone_coti")}
                            error={errors.mone_coti?.message}
                            desactivado={(getValues('mone') == 'PES' || bloquear)}
                        />
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-3 md:col-span-2 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <InputCommon
                            titulo={"Codigo"}
                            tipo={'number'}
                            error={errors.num_cliente?.message}
                            placeholder={""}
                            useForm={register("num_cliente", { onBlur: consultarClientesPorCodigo })}
                            desactivado={bloquear}
                        />
                    </div>
                </div>

                <div className="col-span-4 sm:col-span-5 md:col-span-3 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <ComboBoxSelect
                            titulo={"Cliente"}
                            data={clientes}
                            seleccionado={cliente.id}
                            setearCodigo={seleccionarClienteSelec}
                            llenarData={consutlarClientes}
                            desactivado={bloquear}
                        />
                    </div>
                    <div>
                        <ButtonCommon
                            type="button"
                            texto={<MagnifyingGlassIcon aria-hidden="true" className="h-7 w-7" />}
                            px={"px-1"}
                            py={"py-1"}
                            tooltip="Buscar Clientes"
                            onClick={toggleAbrirClientesConsul}
                            desactivado={bloquear}
                        />
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-1 md:col-span-1 flex items-center">

                </div>
                <div className="col-span-2 sm:col-span-3 md:col-span-2 flex items-center">
                    {/* <div className='w-full mr-2 h-20'>
                        <InputCommon
                            titulo={"Factura"}
                            tipo={'number'}
                            placeholder={""}
                        />
                    </div> */}
                </div>
            </div>

            <ClientesConsul
                setCliente={seleccionarCliente}
                open={abrirClientesConsul}
                setOpen={setAbrirClientesConsul}
            />
        </>
    )

}