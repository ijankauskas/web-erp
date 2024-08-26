
export default function Paginado() {

    return (
        <nav className="flex items-center justify-between w-full p-4">
            <div className="text-sm text-ellipsis truncate">
                Showing 1 to 10 of 20 results
            </div>
            <div className="text-sm flex items-center justify-end">
                <div>
                    <button
                        type="button"   
                        className="ring-1 ring-gray-300 ring-inset px-3 py-2 rounded-md font-semibold mr-4"  
                    >
                        Anterior
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className="ring-1 ring-gray-300 ring-inset px-3 py-2 rounded-md font-semibold"  
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </nav>
    )
}