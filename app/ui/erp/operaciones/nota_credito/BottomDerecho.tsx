import { useEffect, useState } from "react";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import InputCommon from "../../../inputCommon";


export default function BottomDerecho({ register, articulos, setAlerta, pagos, setPagos }: any) {
    const [columnWidths, setColumnWidths] = useState([150, 400, 100, 125, 125, 100]);

    useEffect(() => {
        cargarComponente()
    }, [])
    function cargarComponente() {

    }


    const handleMouseDown = (index: any, event: any) => {
        const startX = event.clientX;
        const startWidth = columnWidths[index];
        const onMouseMove = (e: any) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newWidths = [...columnWidths];
            newWidths[index] = Math.max(newWidth, 50); // Establece un ancho mínimo
            setColumnWidths(newWidths);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };


    return (
        <div className="flex">

            <div className="flex w-full flex-col">
                <Tabs color={"primary"} aria-label="Pagos">
                    <Tab key="music" title="Totales">
                        <Card className="h-[25vh]">
                            <CardBody>
                                <div className="text-black flex justify-between items-center">
                                    <label htmlFor="">Sub total Gravado</label>
                                    <div className="w-[200px]">
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
                                </div>
                                <div className="text-black flex justify-between items-center">
                                    <label htmlFor="">Total IVA</label>
                                    <div className="w-[200px] mt-1">
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
                                </div>
                                <div className="text-black flex justify-between items-center">
                                    <label htmlFor="">Total Facturado</label>
                                    <div className="w-[200px]  mt-1">
                                        <InputCommon
                                            tipo={'text'}
                                            texto={articulos?.reduce((acc: number, articulo: any) => {
                                                const calculo = (articulo.precio_vta * articulo.cantidad);
                                                return acc + parseFloat(calculo.toFixed(2));
                                            }, 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            id={'subtotal'}
                                            textAlign={'text-end'}
                                            desactivado={true}
                                        />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="photos" title="Pagos">

                    </Tab>
                </Tabs>
            </div>
        </div >
    );
}
