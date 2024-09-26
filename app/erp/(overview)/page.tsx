'use client'
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Spinner } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

export default function LoadingButton() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showPanel, setShowPanel] = useState(false);


  const handleClick = () => {
    setShowPanel(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        setShowPanel(false); // Ocultar el panel después de mostrar el check
      }, 3000); // Mostrar el check durante 1 segundo
    }, 3000); // 1 segundo para el "Cargando"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
        onClick={handleClick}
        disabled={loading || completed} // Desactivar mientras está cargando o completado
      >
        Click me
      </button>

      {/* Animación del panel emergente */}
      <Transition
        show={showPanel}
        enter="transform transition duration-500"
        enterFrom="translate-y-[250%]" // Viene desde más abajo
        enterTo="translate-y-0"
        leave="transform transition duration-500"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-[250%]" // Sale hacia más abajo
      >
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-32 h-10">
          {/* Explosión verde */}
          {completed && (
            <div className="absolute w-40 h-40 bg-green-500 rounded-full animate-ping"></div>
          )}

          {/* Contenedor negro del mensaje */}
          <div className="relative flex items-center justify-center w-full h-full bg-black text-white rounded-lg">
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Spinner */}
              <Transition
                show={loading}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="flex items-center text-sm">
                  <span>Cargando...</span>
                  <Spinner color="primary" />
                </div>
              </Transition>

              {/* Check */}
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
    </div>
  );
}
