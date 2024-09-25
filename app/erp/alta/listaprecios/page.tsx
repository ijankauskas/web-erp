'use client'
import TablaListas from '@/app/ui/erp/lista_precios/TablaListas';
import TablaListasItems from '@/app/ui/erp/lista_precios/TablaListasItems';
import Paginado from '@/app/ui/erp/saldos_cliente/Paginado';
import PaginadoComp from '@/app/ui/erp/saldos_cliente/PaginadoComp';
import TablaComprobantes from '@/app/ui/erp/saldos_cliente/TablaComprobantes';
import InputCommon from '@/app/ui/inputCommon';
import React, { useState, useRef, Suspense } from 'react';

const ConsultaSaldos = () => {
    const [dividerPosition, setDividerPosition] = useState(25);
    const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);
    const [listaSeleccionado, setListaSeleccionado] = useState<any>('');
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const [paginaComps, setPaginaComps] = useState(1);

    const handleMouseDown = (event: any) => {
        const startX = event.clientX;
        const startDividerPosition = dividerPosition;

        const onMouseMove = (e: any) => {
            const newDividerPosition = startDividerPosition + ((e.clientX - startX) / window.innerWidth) * 100;
            setDividerPosition(Math.min(Math.max(newDividerPosition, 10), 90));
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const settearBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
    }

    const seleccionarLista = (lista: any) => {
        setListaSeleccionado(lista)
    }

    const cambiarPagina = (cambio: any) => {
        setPagina(pagina + cambio)
    }

    const cambiarPaginaComp = (cambio: any) => {
        setPaginaComps(paginaComps + cambio)
    }

    return (
        <div className='px-2 flex flex-col h-full'>
            <div className="lg:flex lg:items-center lg:justify-between border-b py-2">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Listas de Precios
                    </h2>

                </div>
            </div>
            <div className="flex w-full h-full">
                {isLeftPanelVisible && (
                    <div style={{ width: `${dividerPosition}%` }}>
                        <div className="flex flex-col h-full"> {/* Contenedor principal que ocupa toda la altura disponible */}
                            <div className="flex flex-col items-start justify-start bg-gray-100 flex-grow"> {/* Flex-grow para que este div crezca y ocupe el espacio disponible */}
                               
                                <div className="p-2 w-full items-center bg-gray-200 flex justify-start border-gray-300">
                                    <label className='mr-4' htmlFor="">Filtrar Listas:</label>
                                    <InputCommon
                                        onChange={settearBusqueda}
                                    />
                                </div>
                                <div className="w-full h-full bg-white overflow-y-auto overflow-x-auto flex-grow"> {/* Flex-grow para que el contenedor de la tabla crezca */}
                                    <TablaListas
                                        busqueda={busqueda}
                                        seleccionarLista={seleccionarLista}
                                        pagina={pagina}
                                        setPagina={setPagina}
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-100 w-full p-0"> {/* Contenedor para el paginado que siempre estará al final */}
                                <Paginado pagina={pagina} cambiarPagina={cambiarPagina} />
                            </div>
                        </div>

                    </div>
                )}
                <div
                    className={`w-1 bg-gray-300 cursor-col-resize ${!isLeftPanelVisible ? 'hidden' : ''} hover:bg-gray-400`}
                    onMouseDown={handleMouseDown}
                ></div>
                <div
                    className="flex flex-col items-start justify-start bg-gray-100 overflow-auto"
                    style={{ width: isLeftPanelVisible ? `${100 - dividerPosition}%` : '100%' }}
                >
                    <div className="px-2 w-full bg-gray-200 flex justify-between items-center border-b border-gray-300">
                        {listaSeleccionado ? (
                            <h1 className="text-lg">
                                {listaSeleccionado?.razon}
                            </h1>

                        ) : (
                            <h1 className="text-lg">
                                Seleccionar items de la lista
                            </h1>

                        )}
                    </div>
                    <div className="w-full h-full bg-white overflow-y-auto overflow-x-auto flex-grow">
                        { <TablaListasItems listas={listaSeleccionado} pagina={paginaComps} setPagina={setPaginaComps} /> }
                    </div>
                    <div className="bg-gray-100 w-full p-0"> {/* Contenedor para el paginado que siempre estará al final */}
                        { /*<PaginadoComp pagina={paginaComps} cambiarPagina={cambiarPaginaComp} lista={listaSeleccionado} />*/ }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultaSaldos;
