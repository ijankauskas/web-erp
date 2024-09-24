import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';

const DismissibleAlert = ({ showPanel, message, type = 'success', onClose, duration = 3000 }: any) => {
  const typeClasses: any = {
    success: 'text-green-800 bg-green-100',
    info: 'text-blue-800 bg-blue-100',
    warning: 'text-yellow-800 bg-yellow-100',
    error: 'text-red-800 bg-red-100',
  };

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <Transition
      show={showPanel}
      enter="transform transition duration-500"
      enterFrom="translate-y-[-100%]"
      enterTo="translate-y-0"
      leave="transform transition duration-500"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-[-100%]"
    >
      <div
        className={`z-9999 fixed top-20 right-8 transform p-3 mb-4 text-sm rounded-lg w-full lg:w-2/6 ${typeClasses[type]}`}
        role="alert"
        style={{ zIndex: 10000 }}
      >
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button
            type="button"
            className="ml-2 p-1.5 rounded-lg hover:bg-opacity-75"
            aria-label="Close"
            onClick={onClose}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default DismissibleAlert;
