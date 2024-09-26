'use client';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Spinner } from '@nextui-org/react';

export default function Loading({ cargando, respuesta }: { cargando: boolean, respuesta: boolean }) {
  const [completed, setCompleted] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false); // Controla la animación de la explosión

  // Efecto para manejar la transición entre "cargando" y "completado"
  useEffect(() => {
    if (cargando) {
      setShowPanel(true);
      setCompleted(false);
    } else if (!cargando && showPanel) {

      setCompleted(true);
      setShowExplosion(true);
      setTimeout(() => {
        setShowPanel(false);
        setShowExplosion(false);
      }, 1000);
    }
  }, [cargando]);

  return (

    <Transition
      show={showPanel}
      enter="transform transition duration-500"
      enterFrom="translate-y-[250%]"
      enterTo="translate-y-0"
      leave="transform transition duration-500"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-[250%]"
    >
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-32 h-10">

        {showExplosion && (
          <div className={`absolute w-40 h-40 ${respuesta ? 'bg-green-500' : 'bg-red-500'} rounded-full animate-ping`}></div>
        )}

        <div className="relative flex items-center justify-center w-full h-full bg-black text-white rounded-lg">
          <div className="relative flex items-center justify-center w-full h-full">

            <Transition
              show={cargando}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex items-center text-sm">
                <Spinner size="sm" color="primary" className='mr-2' />
                <span>Cargando...</span>
              </div>
            </Transition>

            <Transition
              show={completed}
              enter="transition-all duration-500 ease-in-out"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-500 ease-in-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
              className="absolute"
            >
              <div className="text-3xl">✔</div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  );
}
