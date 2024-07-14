export default function InputCommon({ titulo, tipo, placeholder, texto, seleccionar }: any) {

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        seleccionar(event.target.value);
    };

    return (
        <>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                {titulo}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    id="price"
                    name="price"
                    type={tipo}
                    placeholder={placeholder}
                    onChange={seleccionar}
                    onBlur={handleBlur}
                    value={texto}
                    className="w-full text-black rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
        </>
    );
}
