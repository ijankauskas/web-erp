'use client'

import ButtonCommon from "../../ButtonCommon";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import BottomDerecho from "./BottomDerecho";


export default function Bottom({ register, articulos, clickLimpiar, bloquear, iva, errors, setValue, clearErrors, cliente, imprimirComp, eliminarComp }: any) {


    return (
        <>
            <div className="px-8 grid grid-cols-12 gap-1 gap-y-0">
                <div className="col-span-4 grid grid-cols-4 gap-2 ">
                    <div className="grid-span-1">
                        <Dropdown isDisabled={!bloquear}>
                            <DropdownTrigger>
                                <button
                                    type={"button"}
                                    className={`w-full text-end items-center justify-center inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${!bloquear ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-800 focus:ring-gray-600'} `}
                                    disabled={!bloquear}
                                >
                                    Acciones
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="edit" onClick={imprimirComp}>Imprimir</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger" onClick={eliminarComp}>
                                    Eliminar
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
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
                    <BottomDerecho
                        register={register}
                        articulos={articulos}
                        iva={iva}
                        errors={errors}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        cliente={cliente}
                    />
                </div>
            </div>
        </>
    );
}
