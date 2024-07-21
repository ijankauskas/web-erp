import React, { useState } from 'react';

import InputCommon from '../../inputCommon'
import ToggleSwitch from '../../ToggleSwitch';
import TablaComponentes from './TablaComponentes';


const Componentes = ({ register, setValue, clearErrors, errors }: any) => {

    const [isChecked, setIsChecked] = useState(true);

    const handleToggle = (ev: any) => {
        setIsChecked(!isChecked);
        setValue('activo', isChecked);
    };


    return (
        <div className="spt-4 border-b">
            <div className="py-5">
                <TablaComponentes />
            </div>
        </div>
    );
};

export default Componentes;
