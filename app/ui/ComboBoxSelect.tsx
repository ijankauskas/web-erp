'use client'
import { useState, Fragment, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ComboBoxSelect({ titulo='', data, seleccionado, setearCodigo, mostrarError, useForm, error, llenarData, paddingY = 'py-1.5', index, desactivado }: any) {
  const [selectedPerson, setSelectedPerson] = useState<{ id: any; name: string } | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {    
    if (seleccionado == '' || seleccionado == null) {
      setSelectedPerson({ id: '', name: '' });
      setearCodigo('');
      return
    }

    const selected = data?.find((person: any) => person.id == (seleccionado));
    if (selected) {
      setSelectedPerson(selected);
    } else {
      setSelectedPerson(null);
      setearCodigo('');
      if (mostrarError) {
        setSelectedPerson({ id: '', name: '' });
        mostrarError();
      }
    }
  }, [seleccionado, data]);

  const consultar = (event:any)=>{
    setQuery(event.target.value)
    if(llenarData){
      llenarData(event.target.value)
    }
  }

  const seleccionarOpcion = (person: { id: any; name: string } | null) => {
    setSelectedPerson(person);
    setearCodigo(person?.id,index)
  };

  const filteredPeople =
    query === ''
      ? data
      : data.filter((person: any) =>
        person.name
          .toLowerCase()
          .includes(query.toLowerCase())
      );

  return (
    <>
      <Combobox as="div" value={selectedPerson} onChange={seleccionarOpcion} {...useForm} disabled={desactivado}>
        <Combobox.Label className="block text-sm font-medium text-gray-700">{titulo}</Combobox.Label>
        <div className={`relative ${titulo == ''? 'mt-0': 'mt-1'}`}>
          <Combobox.Input
            className={`relative z-0 block w-full rounded-md border-0 px-2.5 ${paddingY} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 
            ${error ? 'focus:ring-red-600 ring-red-300' : 'focus:ring-primary'} ${desactivado ? 'bg-gray-100' : ''}`}
            onChange={(event) => consultar(event)}
            displayValue={(person: any) => (person ? person.name : '')}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          {filteredPeople?.length > 0 && (
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.map((person: any) => (
                <Combobox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-1.5 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {
        error && <p className="text-sm text-red-600">{error}</p>
      }
    </>
  );
}
