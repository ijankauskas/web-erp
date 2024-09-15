'use client'

import { useState } from "react";
import BottomDerecho from "./BottomDerecho";



export default function Bottom({ register, articulos, pagos, setAlerta, setPagos }: any) {

    return (
        <>
            <div className="px-8 grid grid-cols-12 gap-1 gap-y-0">
                <div className="col-span-4">

                </div>
                <div className="col-span-8">
                    <BottomDerecho register={register} articulos={articulos} pagos={pagos} setPagos={setPagos} />

                </div>


            </div>

        </>
    );
}
