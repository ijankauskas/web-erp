"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { articuloSchema } from '../../validaciones/articulo';


import { PhotoIcon } from '@heroicons/react/24/outline';
import TabsArticulo from '@/app/ui/erp/alta_articulo/TabsArticulo';

type Inputs = {
  codigo: string,
  descripcion: string,
  descripcion_adicional: string,
  costo: string,
  stock: string,
  precio_vta: string,
  precio_oferta: string,
  oferta: string,
  destacado: string,
  activo: string,
  file: any,
}
import {
  HomeIcon,
} from '@heroicons/react/24/outline'
import FichaArticulo from '@/app/ui/erp/alta_articulo/FichaArticulo';
import PreciosArticulo from '@/app/ui/erp/alta_articulo/PreciosArticulo';
import CheckArticulo from '@/app/ui/erp/alta_articulo/CheckArticulo';
import Componentes from '@/app/ui/erp/alta_articulo/Componentes';

const tabs = [
  { name: 'Ficha', id: '0', current: true },
  { name: 'Componentes', id: '1', current: false },
];


export default function alta_articulo() {
  const [cargando, setCargando] = useState(false)
  const [tab, setTab] = useState(0)
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm<Inputs>({
    defaultValues: {
      codigo: '',
      descripcion: '',
      descripcion_adicional: '',
      costo: '',
      stock: '',
      precio_vta: '',
      precio_oferta: '',
      oferta: '',
      destacado: '',
      activo: '',
      file: '',
    },
    resolver: zodResolver(articuloSchema)
  })

  const seleccionarTab = (tab: any) => {
    setTab(tab)
  }

  const enviarForm = async (data: any) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "file" && data.file && data.file.length > 0) {
        formData.append(key, data.file[0]);
      } else {
        formData.append(key, data[key]);
      }
    });


    setCargando(true);
    const response = await fetch('http://localhost:8080/articulos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Se creo el usuario")
      setCargando(false);
    } else {
      const errorMessage = await response.json(); // Lee el cuerpo de la respuesta como JSON
      alert(errorMessage.message); // Muestra el mensaje de error en un alert
      setCargando(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
      <TabsArticulo tabs={tabs} seleccionarTab={seleccionarTab} tab={tab} />
      <div className='relative '>
        <form action="#" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
          {tab == 0 ?
            <>
              <FichaArticulo
                register={register}
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
              />
              <PreciosArticulo
                register={register}
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
              />
              <CheckArticulo
                register={register}
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
              />
            </> :
            tab == 1 ?
              <>
                <Componentes
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  clearErrors={clearErrors}
                />
              </> :
              'Posición no definida.'}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
