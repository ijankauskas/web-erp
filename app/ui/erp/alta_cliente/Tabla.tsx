'use client'

import { useEffect, useState } from "react";
import ModalPagos from "./ModalPagos";
import Modal from "./modal";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { imprimirPDF, DbCompEmitidosConsul } from "@/app/lib/data";
import Image from "next/image";

export default function Tabla({ cliente }: any) {
    const [columnWidths, setColumnWidths] = useState([50, 125, 50]);
    const [ordenarConfig, setOrdenarConfig] = useState({ key: 'razon', direction: 'asc' });
    const [comprobantes, setComprobantes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [abrirModal, setAbrirModal] = useState(false);
    const [abrirModalPago, setModalPago] = useState(false);

    useEffect(() => {
        cargarComponente()
    }, [])

    async function cargarComponente() {
        consultarComprobantes()
    }

    async function consultarComprobantes() {

        const response = await DbCompEmitidosConsul(cliente, pagina)
        const data = await response.json()
        console.log(data);

        if (response.ok) {
            setComprobantes(data)
        }
    }

    const ToggleModal = () => {
        setAbrirModal(!abrirModal)
    }

    const ModalPago2 = () => {
        setModalPago(!abrirModalPago)
    }

    const orderClientes = (key: any) => {
        let direction = 'asc';
        if (ordenarConfig.key === key && ordenarConfig.direction === 'asc') {
            direction = 'desc';
        }
        setPagina(1);
        setOrdenarConfig({ key, direction });
    };

    const handleMouseDown = (index: any, event: any) => {
        const startX = event.clientX;
        const startWidth = columnWidths[index];
        const onMouseMove = (e: any) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newWidths = [...columnWidths];
            newWidths[index] = Math.max(newWidth, 10); // Establece un ancho mínimo
            setColumnWidths(newWidths);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const imprimirComprobante = async (comp: any) => {

        const response = await imprimirPDF('FAC', comp.tipo, comp.num);

        // Convertir la respuesta en un Blob de tipo PDF
        const pdfBlob = await response.blob();

        // Crear una URL para el Blob del PDF
        const pdfURL = URL.createObjectURL(pdfBlob);

        // Crear un iframe invisible para cargar el PDF
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none'; // Ocultar el iframe
        iframe.src = pdfURL;

        // Cuando el iframe esté cargado, ejecutar el cuadro de diálogo de impresión
        iframe.onload = () => {
            iframe.contentWindow?.print(); // Abrir el cuadro de impresión nativo de Chrome
        };

        // Añadir el iframe al documento
        document.body.appendChild(iframe);


    }

    return (
        <>
            <div className="overflow-x-auto shadow-md rounded-lg overflow-y-auto h-[71vh]">
                <table className="min-w-full w-full table-fixed">
                    <thead className="bg-gray-100 sticky top-0 z-10"> {/* Ajuste del z-index */}
                        <tr className="border-b border-gray-200"> {/* Asegurarse que el border esté presente */}
                            <th
                                style={{ width: columnWidths[0] }}
                                scope="col"
                                className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                onClick={() => orderClientes('num')}
                            >
                                <div className='flex px-2 py-2'>
                                    Numero
                                    {ordenarConfig.key === 'num' && (
                                        <span className="ml-2">
                                            {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                        </span>
                                    )}
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(0, e)}
                                    />
                                </div>
                            </th>
                            <th
                                style={{ width: columnWidths[1] }}
                                scope="col"
                                className="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 text-ellipsis overflow-hidden hover:bg-indigo-100"
                                onClick={() => orderClientes('descripcion')}
                            >
                                <div className='flex px-2 py-2'>
                                    Descripcion
                                    {ordenarConfig.key === 'descripcion' && (
                                        <span className="ml-2">
                                            {ordenarConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                                        </span>
                                    )}
                                    <div
                                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-gray-300"
                                        onMouseDown={(e) => handleMouseDown(1, e)}
                                    />
                                </div>
                            </th>

                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {comprobantes.length > 0 ? (
                            comprobantes.map((comprobante) => (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        19
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Factura A Electronica
                                    </td>
                                    <td className="w-12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => imprimirComprobante(comprobante)}>
                                            Pago
                                        </a>
                                    </td>
                                    <td className="w-12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={ToggleModal}>
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="w-full text-center px-2 py-4 text-sm text-gray-500">
                                    <div className="w-2/6 mx-auto">
                                        <Image
                                            src="/not-found.png"
                                            layout="responsive"
                                            width={500}
                                            height={205}
                                            className="flex items-center"
                                            alt="Screenshots of the dashboard project showing desktop version"
                                        />
                                        El cliente no tiene comprobante ingresados.
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalPagos isOpen={abrirModalPago} onClose={ModalPago2} />
            <Modal isOpen={abrirModal} onClose={ToggleModal} />
        </>


    );
}
