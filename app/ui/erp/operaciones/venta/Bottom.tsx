'use client'

import BottomDerecho from "./BottomDerecho";
import ButtonCommon from "../../ButtonCommon";
import { PlusCircleIcon } from "@heroicons/react/24/outline";


export default function Bottom({ register, articulos, pagos, setPagos, clickLimpiar, bloquear }: any) {
    return (
        <>
            <div className="px-8 grid grid-cols-12 gap-1 gap-y-0">
                <div className="col-span-4 grid grid-cols-4 gap-2 ">
                    <div className="grid-span-1">
                        <ButtonCommon
                            type="button"
                            texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Limpiar</>}
                            onClick={clickLimpiar}
                        />
                    </div>
                    <div className="grid-span-1">
                        <ButtonCommon
                            type="submit"
                            texto={<><PlusCircleIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Guardar</>}
                            desactivado={bloquear}
                        />
                    </div>
                </div>
                <div className="col-span-8">
                    <BottomDerecho register={register} articulos={articulos} pagos={pagos} setPagos={setPagos} />
                </div>
            </div>
        </>
    );
}
