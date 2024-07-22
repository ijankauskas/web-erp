import React, { useState } from 'react';

import InputCommon from '../../inputCommon'
import ToggleSwitch from '../../ToggleSwitch';


const CheckArticulo = ({ register, setValue, clearErrors, errors, getValues }: any) => {

    const [isChecked, setIsChecked] = useState(getValues('activo'));

    const handleToggle = (ev: any) => {
        setIsChecked(!isChecked);
        setValue('activo', isChecked);
    };


    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4 border-b">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Configuracion.</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        En esta seccion puedes aplicar configuraciones al articulo.
                    </p>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="">
                    <div className="px-4 py-5 sm:p-6">
                        <ToggleSwitch
                            label={"Activo"}
                            description={"Si desactivas el articulo no podras verlo."}
                            handleToggle={handleToggle}
                            isChecked={isChecked}
                            error={errors.activo?.message}
                            id={"activo"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckArticulo;
