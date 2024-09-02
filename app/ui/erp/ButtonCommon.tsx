

export default function ButtonCommon({texto, onClick, type, desactivado}:any) {

    return (
        <button
            onClick={onClick}
            type={type}
            className={`w-full text-end flex items-center justify-center inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                        ${desactivado ? 'bg-gray-300' :'bg-indigo-600 hover:bg-indigo-700' }`}
            disabled={desactivado} 
        >
            {texto}
        </button>
    )
}
