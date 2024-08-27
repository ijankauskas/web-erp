'use client'

import { useState } from "react";
import InputCommon from "../../inputCommon";


export default function TablaTotales({ register, articulos, setAlerta, setArticulos }: any) {

    return (
        <>
            <div className="px-8 grid grid-cols-12 gap-1 gap-y-0">
                <div className="col-span-3 grid grid-cols-2 gap-2 gap-y-0">
                    <div className="flex items-center col-span-1">
                        <label htmlFor="">Sub total Gravado</label>
                    </div>
                    <div className="col-span-1">
                        <InputCommon
                            tipo={'text'}
                            texto={articulos?.reduce((acc: number, articulo: any) => {
                                const calculo = (79 * articulo.precio_vta * articulo.cantidad) / 100;
                                return acc + parseFloat(calculo.toFixed(2));
                            }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            id={'subtotal'}
                            textAlign={'text-end'}
                            desactivado={true}
                        />

                    </div>
                    <div className="flex items-center col-span-1">
                        <label htmlFor="">Total IVA</label>
                    </div>
                    <div className="col-span-1">
                        <InputCommon
                            tipo={'text'}
                            texto={articulos?.reduce((acc: number, articulo: any) => {
                                const calculo = (21 * articulo.precio_vta * articulo.cantidad) / 100;
                                return acc + parseFloat(calculo.toFixed(2));
                            }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            id={'subtotal'}
                            textAlign={'text-end'}
                            desactivado={true}
                        />
                    </div>
                    <div className="flex items-center col-span-1">
                        <label htmlFor="">Total Facturado</label>
                    </div>
                    <div className="col-span-1">
                        <InputCommon
                            tipo={'text'}
                            texto={articulos?.reduce((acc: number, articulo: any) => {
                                const calculo = ( articulo.precio_vta * articulo.cantidad);
                                return acc + parseFloat(calculo.toFixed(2));
                            }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            id={'subtotal'}
                            textAlign={'text-end'}
                            desactivado={true}
                        />
                    </div>
                </div>
                <div className="col-span-4">

                </div>

            </div>

        </>
    );
}
