'use client'

import { useState } from "react";
import ModalPagos from "./ModalPagos";
import Modal from "./modal";
export default function Tabla() {

    const [abrirModal, setAbrirModal] = useState(false)
    const [abrirModalPago, setModalPago] = useState(false)
    const ToggleModal = () => {
        setAbrirModal(!abrirModal)
    }

    const ModalPago2 = () => {
        setModalPago(!abrirModalPago)
    }
    return (
        <>
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md sm:rounded-lg">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                    Descripcion
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                    Numero
                                </th>
                                <th scope="col" className="w-[50px] px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                    Sucursal
                                </th>
                                <th scope="col" className="w-[50px] px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                    Total
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
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    19
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Factura A Electronica
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    14323
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    0009
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    $ 1990.00
                                </td>
                                <td className="w-12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={ModalPago2}>
                                        Pago
                                    </a>
                                </td>
                                <td className="w-12 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={ToggleModal}>
                                        Eliminar
                                    </a>
                                </td>
                            </tr>
                            {/* More rows... */}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalPagos isOpen={abrirModalPago} onClose={ModalPago2}/>
            <Modal isOpen={abrirModal} onClose={ToggleModal} />
        </>


    );
}
