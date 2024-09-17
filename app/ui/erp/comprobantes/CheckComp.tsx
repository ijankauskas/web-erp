'use cliente'

import React, { useEffect, useState } from 'react';

import InputCommon from '../../inputCommon'
import ToggleSwitch from '../../ToggleSwitch';


const CheckComp = ({ register, setValue, clearErrors, errors, getValues, watch }: any) => {
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

        <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="">
                <div className="py-5">
                    <ToggleSwitch
                        label={"Activo"}
                        description={"Si desactivas el comprobante no podras verlo."}
                        handleToggle={setActivoHandleToggle}
                        isChecked={activo}
                        error={errors.activo?.message}
                        id={"activo"}
                    />
                </div>
            </div>
        </div>

    );
};

export default CheckComp;
