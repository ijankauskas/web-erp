'use client'

import InputCommon from "@/app/ui/inputCommon";
import ButtonCommon from "../../ButtonCommon";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";


export default function Bottom({ register, compEmitidos, pagos }: any) {
    const [diferencia, setDiferencia] = useState(0)

    useEffect(() => {
        calcularDiferencia();
    }, [compEmitidos, pagos])

    const calcularDiferencia = () => {
        const comp = compEmitidos?.reduce((acc: number, compEmitido: any) => {
            const calculo = compEmitido.saldo //(compEmitido.tipo[0] == 'C' ? (compEmitido.saldo * -1) : compEmitido.saldo);
            return acc + parseFloat(calculo.toFixed(2));
        }, 0)

        const pago = pagos?.reduce((acc: number, pago: any) => {
            const calculo = pago.importe;
            return acc + parseFloat(calculo.toFixed(2));
        }, 0)

        setDiferencia(comp - pago)
    }

    return (
        <>
            <div className="px-8 grid grid-cols-12 gap-1 gap-y-0">
                <div className="col-span-4">
                    <Tabs color={"primary"} aria-label="Pagos">
                        <Tab key="music" title="Totales">
                            <div className="p-4 h-[25vh] w-full overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg max-h-[400px] bg-white border-gray-200 border">
                                <div className="text-black flex justify-between items-center">
                                    <label htmlFor="">Total Aplicado</label>
                                    <div className="w-[200px]">
                                        <InputCommon
                                            tipo={'text'}
                                            texto={compEmitidos?.reduce((acc: number, compEmitido: any) => {
                                                const calculo = compEmitido.saldo //(compEmitido.tipo[0] == 'C' ? (compEmitido.saldo * -1) : compEmitido.saldo);
                                                return acc + parseFloat(calculo.toFixed(2));
                                            }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            id={'subtotal'}
                                            textAlign={'text-end'}
                                            desactivado={true}
                                        />
                                    </div>
                                </div>
                                <div className="text-black flex justify-between items-center">
                                    <label htmlFor="">Total Valores</label>
                                    <div className="w-[200px] mt-1">
                                        <InputCommon
                                            tipo={'text'}
                                            texto={pagos?.reduce((acc: number, pago: any) => {
                                                const calculo = pago.importe;
                                                return acc + parseFloat(calculo.toFixed(2));
                                            }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            id={'total_iva'}
                                            textAlign={'text-end'}
                                            desactivado={true}
                                        />
                                    </div>
                                </div>
                                <div className="text-black flex justify-between items-center">
                                    <label htmlFor="">Diferencia</label>
                                    <div className="w-[200px] mt-1">
                                        <InputCommon
                                            tipo={'text'}
                                            texto={diferencia.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            id={'total'}
                                            textAlign={'text-end'}
                                            desactivado={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className="col-span-4 grid grid-cols-4 gap-2 ">
                    <div className="grid-span-1">
                        <ButtonCommon
                            type="submit"
                            texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Guardar</>}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
