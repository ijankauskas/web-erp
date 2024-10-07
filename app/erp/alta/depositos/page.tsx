"use client"

import DismissibleAlert from "@/app/ui/DismissAlerta"
import ButtonCommon from "@/app/ui/erp/ButtonCommon";
import Drawer from '@/app/ui/erp/depositos/drawer';
import TablaDepositos from "@/app/ui/erp/depositos/TablaDepositos"
import { Suspense, useState } from "react"


export default function Depositos() {
    const [depositosSelect, setDepositosSelect] = useState({});
    const [abrirCabecera, setAbrirCabecera] = useState(false);
    const [bloquearEliminar, setBloquearEliminar] = useState(false);
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

    const AbrirDrawlerDepo = (depo: any) => {
        setDepositosSelect(depo);
        setAbrirCabecera(true);
        setBloquearEliminar(false)
    }

    const toggleCabecera = () => {
        setAbrirCabecera(!abrirCabecera)
    
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="max-w-screen-2xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="lg:flex lg:items-center lg:justify-between border-b">
                    <div className="w-full flex items-center justify-between py-4">
                        <h3 className="w-1/3 items font-semibold leading-7 text-gray-900 text-lg">
                            Alta de Depositos
                        </h3>
                        <div className="w-[150px]">
                            <ButtonCommon
                                texto={"Nuevo Deposito"}
                                onClick={toggleCabecera}
                                type={"button"}
                            />
                        </div>
                        <Drawer abrir={abrirCabecera}
                            toggleAbrir={toggleCabecera}
                            depositosSelect={depositosSelect}
                            setAlerta={setAlerta}
                            setBloquearEliminar={setBloquearEliminar}
                            bloquearEliminar={bloquearEliminar}
                        />
                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <TablaDepositos
                            setDepositosSelect={AbrirDrawlerDepo}
                        />
                    </div>
                </div>

                <DismissibleAlert
                    message={alerta.message}
                    type={alerta.type}
                    onClose={closeAlertaDismiss}
                    showPanel={alerta.alertVisible}
                />
            </div>
        </Suspense>
    )
}