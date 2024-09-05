'use client'

import { useState } from "react";
import BottomDerecho from "./BottomDerecho";


export default function Bottom({ register, articulos, setAlerta, setArticulos }: any) {

    return (
        <>
            <div className="px-8 grid grid-cols-12 gap-1 gap-y-0">
                <div className="col-span-3">
                    
                </div>
                <div className="col-span-9 mr-4">
                    <BottomDerecho articulos={articulos}/>
                    
                </div>


            </div>

        </>
    );
}
