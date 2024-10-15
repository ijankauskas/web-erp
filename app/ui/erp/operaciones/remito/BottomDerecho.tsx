import { useEffect, useRef, useState } from "react";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import InputCommon from "../../../inputCommon";


export default function BottomDerecho({ register, articulos, setAlerta, iva, errors, bloquear, setValue, clearErrors, cliente }: any) {

    return (
        <div className="flex">

            <div className="flex w-full flex-col">
                <Tabs color={"primary"} aria-label="Pagos">
                    <Tab key="music" title="Totales">
                        <div className="p-4 h-[25vh] w-full overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg max-h-[400px] bg-white border-gray-200 border">
                            <div className="text-black flex justify-between items-center">
                                <label htmlFor="">Total sin IVA</label>
                                <div className="w-[200px]">
                                    <InputCommon
                                        tipo={'text'}
                                        texto={articulos?.reduce((acc: number, articulo: any) => {
                                            const calculo = (articulo.precio_vta * articulo.cantidad / (1 + articulo.porcen_iva / 100));
                                            return acc + parseFloat(calculo.toFixed(2));
                                        }, 0).toLocaleString('en-US',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        id={'subtotal'}
                                        textAlign={'text-end'}
                                        desactivado={true}
                                    />
                                </div>
                            </div>
                            <div className="text-black flex justify-between items-center">
                                <label htmlFor="">Total Con IVA</label>
                                <div className="w-[200px] mt-1">
                                    <InputCommon
                                        tipo={'text'}
                                        texto={articulos?.reduce((acc: number, articulo: any) => {
                                            const calculo = (articulo.precio_vta * articulo.cantidad);
                                            return acc + parseFloat(calculo.toFixed(2));
                                        }, 0).toLocaleString('en-US',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
        </div >
    );
}
