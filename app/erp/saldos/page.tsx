'use client'
import Paginado from '@/app/ui/erp/saldos/Paginado';
import TablaClientes from '@/app/ui/erp/saldos/TablaClientes';
import React, { useState, useRef } from 'react';

const ConsultaSaldos = () => {
    const [dividerPosition, setDividerPosition] = useState(25);
    const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);

    const handleMouseDown = (event) => {
        const startX = event.clientX;
        const startDividerPosition = dividerPosition;

        const onMouseMove = (e) => {
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

    const toggleLeftPanel = () => {
        setIsLeftPanelVisible(!isLeftPanelVisible);
        if (!isLeftPanelVisible) {
            setDividerPosition(50); // Restaurar la posición al mostrar el panel izquierdo
        } else {
            setDividerPosition(0); // Colapsar el panel izquierdo
        }
    };

    return (
        <div className="flex w-full">
            {isLeftPanelVisible && (
                <div style={{ width: `${dividerPosition}%` }}>
                    <div
                        className="flex flex-col items-start justify-start bg-gray-100"
                        
                    >
                        <div className="p-4 w-full bg-gray-200 flex justify-between items-center">
                            <h1 className="text-lg font-bold">Listado de clientes</h1>
                            <button
                                className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
                                onClick={toggleLeftPanel}
                            >
                                Hide
                            </button>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <TablaClientes />
                        </div>
                    </div>
                    <Paginado />
                </div>
            )}
            <div
                className={`w-1 bg-gray-600 cursor-col-resize ${!isLeftPanelVisible ? 'hidden' : ''}`}
                onMouseDown={handleMouseDown}
            ></div>
            <div
                className="flex flex-col items-start justify-start bg-gray-300 overflow-auto"
                style={{ width: isLeftPanelVisible ? `${100 - dividerPosition}%` : '100%' }}
            >
                <div className="p-4 w-full bg-gray-400">
                    <h1 className="text-lg font-bold">Right Pane</h1>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <p>Content goes here...</p>
                </div>
            </div>
        </div>
    );
};

export default ConsultaSaldos;
