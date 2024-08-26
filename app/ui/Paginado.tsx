'use state'
import React from 'react';

const Paginacion = ({ paginado, paginaActual, changePaginaActual, previousPage, nextPage }:any) => {
  return (
    <div className="w-full flex justify-center">
      {paginado.length > 0 && (
        <nav className="mt-2 isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <p
            onClick={previousPage}
            className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </p>

          {paginado.map((pagina:any) => (
            <p
              key={pagina}
              onClick={() => changePaginaActual(pagina)}
              className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                pagina === paginaActual
                  ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  : 'bg-white text-gray-900 hover:bg-gray-50 focus:z-20 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
              }`}
            >
              {pagina}
            </p>
          ))}

          <p
            onClick={nextPage}
            className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </nav>
      )}
    </div>
  );
};

export default Paginacion;
