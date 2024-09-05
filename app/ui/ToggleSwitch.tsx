'use client'

import { Switch } from '@headlessui/react';
import React, { useState } from 'react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}


const ToggleSwitch = ({ label, description, defaultChecked = false, handleToggle, isChecked, error }: any) => {



    return (
        <div className="grid grid-cols-6 space-x-4 flex items-center">
            <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <p className="text-gray-500">{description}</p>
                {
                    error && <p className="text-sm text-red-600">{error}</p>
                }
            </div>
            <div className="col-span-1">
                <Switch
                    checked={isChecked}
                    onChange={handleToggle}
                    className={classNames(
                        isChecked ? 'bg-primary' : 'bg-indigo-200',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    )}
                >
                    <span
                        className={classNames(
                            isChecked ? 'translate-x-6' : 'translate-x-1',
                            'inline-block w-4 h-4 transform bg-white rounded-full transition-transform'
                        )}
                    />
                </Switch>
            </div>
        </div>
    );
};

export default ToggleSwitch;
