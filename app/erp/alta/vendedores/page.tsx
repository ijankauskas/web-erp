"use client"

import DismissibleAlert from "@/app/ui/DismissAlerta"
import Cabecera from "@/app/ui/erp/depositos/Cabecera"
import TablaVendedores from "@/app/ui/erp/vendedores/TablaVendedores"
import { ClipboardIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { Tab, Tabs } from "@nextui-org/react"
import { useState } from "react"


export default function Vendedores() {

    const [vendedoresSelect, setVendedoresSelect] = useState({});
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

    return (
        <div className="max-w-screen-2xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
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
                            <span>Vendedores</span>
                        </div>
                    }
                >
                    <div>

                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <TablaVendedores
                                setVendedoresSelect={setVendedoresSelect}

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
                        vendedoresSelect={vendedoresSelect}
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