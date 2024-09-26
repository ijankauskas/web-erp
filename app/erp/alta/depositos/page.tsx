"use client"

import DismissibleAlert from "@/app/ui/DismissAlerta"
import Tabla from "@/app/ui/erp/alta_cliente/Tabla";
import ButtonCommon from "@/app/ui/erp/ButtonCommon";
import Cabecera from "@/app/ui/erp/depositos/Cabecera"
import Drawer from '@/app/ui/erp/depositos/drawer';
import TablaDepositos from "@/app/ui/erp/depositos/TablaDepositos"
import { depositosSchema } from "@/app/validaciones/depositos";
import { ClipboardIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod";
import { Tab, Tabs } from "@nextui-org/react"
import { register } from "module";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";


type Inputs = {
    depo_codi: string,
    descrip: string,
    activo: any,
    domicilio: string,
    telefono: string,
    provincia: string,
    obser: string,
}

export default function Depositos() {

    const [depositosSelect, setDepositosSelect] = useState({});
    const [abrirCabecera, setAbrirCabecera] = useState(false);
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [isLgHidden, setIsLgHidden] = useState(false);
    const [alerta, setAlerta] = useState({
        message: "",
        type: "",
        alertVisible: false
    });
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

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues } = useForm<Inputs>({
        defaultValues: {
            depo_codi: '',
            descrip: '',
            activo: true,
            domicilio: '',
            telefono: '',
            provincia: '',
            obser: '',

        },
        resolver: zodResolver(depositosSchema)
    })
    const [error, setError] = useState({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
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

    const toggleCabecera = () => {
        setAbrirCabecera(!abrirCabecera)
    }

    const mostrarErrorAlerta = () => {
        if (!isInitialMount)
            setError({
                mostrar: true,
                mensaje: 'Error: No se encontró ningun proveedor con ese codigo.',
                titulo: 'Oops...',
                icono: 'error-icon',
            });
    }

    return (
        <div className="max-w-screen-2xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="lg:flex lg:items-center lg:justify-between border-b py-5">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Alta de Depositos
                    </h2>
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
                                onClick={toggleCabecera} // Aquí llamas a la función
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Agregar Deposito
                            </button>

                            {!isLgHidden && (
                                <div className='ml-4'>
                                    <ButtonCommon texto={"Mostrar Datos"} onClick={toggleCabecera} />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            {/* funciones divs y cosas */}

            <Tabs
                aria-label="Options"
                color={"primary"}
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-primary",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-primary"
                }}
            >
                <Tab
                    key="photos"
                    title={
                        <div className="flex items-center space-x-2">
                            <ClipboardIcon className="h-6 w-6" />
                            <span>Depositos</span>
                        </div>
                    }
                >
                    <div>

                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <TablaDepositos
                                setDepositosSelect={setDepositosSelect}

                            />
                        </div>
                    </div>
                </Tab>
                <Tab
                    key="music"
                    title={
                        <div className="flex items-center space-x-2">
                            <CurrencyDollarIcon className="h-6 w-6" />
                            <span>Nuevo</span>

                        </div>
                    }
                >
                    <Cabecera
                        depositosSelect={depositosSelect}
                        setAlerta={setAlerta}
                    />
                </Tab>
            </Tabs>
            <DismissibleAlert
                message={alerta.message}
                type={alerta.type}
                onClose={closeAlertaDismiss}
                showPanel={alerta.alertVisible}
            />
        </div>
    )
}