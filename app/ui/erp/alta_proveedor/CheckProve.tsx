import React, { useEffect, useState } from 'react';

import ToggleSwitch from '../../ToggleSwitch';


const CheckProve = ({ register, setValue, clearErrors, errors, getValues, watch }: any) => {
    const [activo, setActivo] = useState(getValues('activo'));
    const activoValue = watch('activo');

    useEffect(() => {
        setActivo(activoValue);
    }, [activoValue]);

    const setActivoHandleToggle = (ev: any) => {
        setActivo(ev);
        setValue('activo', ev);
    };

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 pt-4 border-b">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Configuracion.</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        En esta seccion puedes aplicar configuraciones del proveedor.
                    </p>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="">
                    <div className="px-4 py-5 sm:p-6">
                        <ToggleSwitch
                            label={"Activo"}
                            description={"Si desactivas el proveedor no podras verlo."}
                            handleToggle={setActivoHandleToggle}
                            isChecked={activo}
                            error={errors.activo?.message}
                            id={"activo"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckProve;
