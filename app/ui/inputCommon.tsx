import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function InputCommon({ titulo = '', tipo, id, placeholder, texto, onChange, funcionOnblur, error, useForm, step, textAlign = 'text-start', desactivado, paddingY = 'py-1.5', onKeyDown }: any) {

    return (
        <>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                {titulo}
            </label>
            <div className={`relative ${titulo == '' ? 'mt-0' : 'mt-1'} rounded-md shadow-sm z-0 `}>
                <input
                    id={id}
                    type={tipo}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={funcionOnblur}
                    value={texto}
                    step={step}
                    {...useForm}
                    disabled={desactivado}
                    onKeyDown={onKeyDown}
                    className={`${textAlign} relative z-0 block w-full rounded-md border-0 px-2.5 ${paddingY} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 
                        ${error ? 'focus:ring-red-600 ring-red-300' : 'focus:ring-primary'}`}
                />
                {
                    error &&
                    <div className="absolute pr-3 flex items-center right-0 top-0 bottom-0">
                        <FontAwesomeIcon className="w-5 h-5 text-red-600" icon={faCircleExclamation} />
                    </div>
                }
            </div>
            {
                error && <p className="text-sm text-red-600">{error}</p>
            }
        </>
    );
}
