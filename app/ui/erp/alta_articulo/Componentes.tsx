'use client'
import React, { useEffect, useState } from 'react';

import InputCommon from '../../inputCommon'
import ToggleSwitch from '../../ToggleSwitch';
import TablaComponentes from './TablaComponentes';

const Componentes = ({ register, setValue, clearErrors, errors, articulosCompo, setArticulosCompo }: any) => {

    return (
        <div className="spt-4 border-b">
            <div className="py-5">
                <TablaComponentes
                    register={register}
                    setValue={setValue}
                    articulosCompo={articulosCompo}
                    setArticulosCompo={setArticulosCompo}
                />
            </div>
        </div>
    );
};

export default Componentes;
