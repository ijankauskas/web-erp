import { Tabs, Tab } from "@nextui-org/react";
import TablaComprobante from "./tablaComprobantes";
import TablaValores from "./tablaValores";

export default function Tablas({ register, setAlerta, cliente, abrirCompPend, abrirCompPendConsul, setAbrirCompPendConsul, settearComprobantes, compEmitidos, pagos, setPagos }: any) {

    return (
        <>
            <div className="py-1 min-w-full sm:px-6 lg:px-8 grid grid-cols-1">
                <Tabs color={"primary"} aria-label="Pagos">
                    <Tab key="comprobantes" title="Comprobantes">
                        <TablaComprobante
                            cliente={cliente}
                            setAlerta={setAlerta}
                            abrirCompPend={abrirCompPend}
                            abrirCompPendConsul={abrirCompPendConsul}
                            setAbrirCompPendConsul={setAbrirCompPendConsul}
                            settearComprobantes={settearComprobantes}
                            compEmitidos={compEmitidos}
                        />
                    </Tab>
                    <Tab key="valores" title="Valores">
                        <TablaValores
                            register={register}
                            pagos={pagos}
                            setPagos={setPagos}
                        />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}
