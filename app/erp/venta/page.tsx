"use client"

import ComboBoxSelect from '@/app/ui/ComboBoxSelect';
import { useState } from 'react';

const people = [
    { id: 1, name: 'asdr' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
];

//todo origin de venta para ventas

export default function alta_articulo() {
    const [cargando, setCargando] = useState(false)

    return (
        <div className="w-full flex flex-col p-8">
            <ComboBoxSelect titulo={"Cliente"} data={people}/>
            <div className="flex justify-end my-2">
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Agregar Item
                </button>
            </div>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Codigo
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Descripcion
                                    </th>
                                    <th scope="col" className="w-[50px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                            type="text"
                                            min="0"
                                            className="w-[100px] border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            defaultValue={' '}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Regional Paradigm Technician
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-[50px] border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            defaultValue={0}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                                {/* More rows... */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
