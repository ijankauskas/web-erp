'use client'
import { useEffect, useState } from "react";
import ComboBoxSelect from "../../../ComboBoxSelect";
import InputCommon from "../../../inputCommon";
import { DbCompConsul, DbConsultarCliente, DbMonedasConsul } from "@/app/lib/data";
import ButtonCommon from "../../ButtonCommon";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ClientesConsul from '@/app/ui/erp/consultas/Clientes_consul';



export default function Cabecera({ register, setValue, clearErrors, errors, mostrarErrorAlerta, getValues }: any) {
    const [num_cliente, setNum_cliente] = useState();
    const [clientes, setClientes] = useState<{}>([]);
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
        setValue('mone', moneDefault);
    }

    const seleccionarClienteSelec = (cliente: any) => {
        setNum_cliente(cliente);
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
        const prox_num: any = comp.filter((comp: any) => comp.id == compSelect);        
        if (prox_num.length > 0) {
            setValue('numero', prox_num[0].prox_num);
        }
        setValue('tipo', compSelect);
        clearErrors('tipo');
    }


    const consultarClientesPorCodigo = async (cliente: any) => {
        const respuesta = await DbConsultarCliente(cliente.target.value);
        const data = await respuesta.json();
        if (respuesta.ok) {
            setClientes([{ id: data.codigo, name: data.razon }])
        }
        setNum_cliente(cliente.target.value)
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
        const respuesta = await DbCompConsul('S', 'F');
        const data = await respuesta.json();
        if (respuesta.ok) {
            const CompMapeados = data.map((comp: any) => ({
                id: comp.tipo || '',
                name: comp.descrip || '',
                prox_num: comp.prox_num.toString() || 1,
            }));
            setComp(CompMapeados);
        }
    }

    const toggleAbrirClientesConsul = () => {
        setAbrirClientesConsul(!abrirClientesConsul)
    }

    const setCliente = (cliente: any) => {        
        setClientes([{ id: cliente.codigo, name: cliente.razon }])
        setNum_cliente(cliente.codigo);
        setValue('num_cliente', cliente.codigo);
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
                            useForm={register("numero")} />
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-6 md:col-span-2 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <InputCommon
                            titulo={"Fecha"}
                            tipo={'date'}
                            error={errors.fecha?.message}
                            placeholder={""}
                            useForm={register("fecha")} />
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-6 md:col-span-2 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <ComboBoxSelect
                            titulo={"Moneda"}
                            data={monedas}
                            seleccionado={moneDefault}
                            setearCodigo={seleccionarMoneSelec}
                            error={errors.mone?.message}
                            mostrarError={mostrarErrorAlerta}
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
                            desactivado={getValues('mone') == 'PES'}
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
                        />
                    </div>
                </div>

                <div className="col-span-4 sm:col-span-5 md:col-span-3 flex items-center">
                    <div className='w-full mr-2 h-20'>
                        <ComboBoxSelect
                            titulo={"Cliente"}
                            data={clientes}
                            seleccionado={num_cliente}
                            setearCodigo={seleccionarClienteSelec}
                            mostrarError={mostrarErrorAlerta}
                            llenarData={consutlarClientes}
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
                        />
                    </div>
                </div>
            </div>
            
            <ClientesConsul
                setCliente={setCliente}
                open={abrirClientesConsul}
                setOpen={setAbrirClientesConsul}
            />
        </>
    )

}