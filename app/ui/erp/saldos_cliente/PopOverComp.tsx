import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';


const PopOverComp = ({ isPopoverOpen, closePopover, popoverPosition, comprobante,imprimirComprobante }: any) => {

    return (
        <>
            <Popover
                placement="bottom"
                showArrow={true}
                isOpen={isPopoverOpen}
                onClose={closePopover}
                style={{
                    position: "absolute",
                    top: popoverPosition.y,
                    left: popoverPosition.x,
                    zIndex: 50,
                }}
            >
                <></>
                <PopoverContent>
                    <div className="w-full px-3 py-2 text-start border-b">
                        <p className="font-semibold text-start block rounded-lg transition">
                            Factura - {comprobante?.num}
                        </p>
                    </div>
                    <div className="px-1 py-2">
                        <a className="block rounded-lg py-2 px-3 transition hover:bg-gray-300" onClick={()=>imprimirComprobante(comprobante)}>
                            <p className="">Imprimir</p>
                        </a>
                        <a className="block rounded-lg py-2 px-3 transition hover:bg-gray-300" >
                            <p className="">Consultar Comprobante</p>
                        </a>
                        <a className="block rounded-lg py-2 px-3 transition hover:bg-gray-300" >
                            <p className="">Enviar por mail</p>
                        </a>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default PopOverComp;