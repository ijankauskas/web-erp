import React, { useState } from 'react';

import InputCommon from '../../inputCommon'
import ToggleSwitch from '../../ToggleSwitch';
import TablaComponentes from './TablaComponentes';

const Componentes = ({ register, setValue, clearErrors, errors, articulosCompo, setArticulosCompo }: any) => {

    const [isChecked, setIsChecked] = useState(true);

    const handleToggle = (ev: any) => {
        setIsChecked(!isChecked);
        setValue('activo', isChecked);
    };

    const consultarArticulo = () => {

    }

    return (
        <div className="spt-4 border-b">
            <div className="py-5">
                <TablaComponentes
                    articulosCompo={articulosCompo}
                    setArticulosCompo={setArticulosCompo}
                />
            </div>
        </div>
    );
};

export default Componentes;
