"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { articuloSchema } from '../../validaciones/articulo';


import { PhotoIcon } from '@heroicons/react/24/outline';

type Inputs = {
  codigo: string ,
  descripcion: string ,
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

export default function alta_articulo() {
  const [cargando, setCargando] = useState(false)
  const {register, handleSubmit, formState: {errors} } = useForm <Inputs>({
    defaultValues: {
        codigo: '' ,
        descripcion: '' ,
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

  const enviarForm = async (data:any) => {

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
    <div className='flex justify-center bg-white'>
      <i className="fa-solid fa-circle-exclamation"></i>
      <form className='w-5/6' onSubmit={handleSubmit(data => enviarForm(data))}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 pt-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Crea o actualiza articulos.</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Esta seccion es solo para perfiles administradores.
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">  

                <div className="sm:col-span-4">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Codigo del Articulo
                    </label>
                    <div className="mt-2 relative">
                        <input
                            type="text"
                            id="codigo"
                            autoComplete="given-name"
                            {...register("codigo")}
                            className={`relative block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                                ${errors.codigo?.message ? 'focus:ring-red-600 ring-red-300' : 'focus:ring-indigo-600'}`}
                        />
                        {
                        errors.codigo?.message && 
                        <div className="absolute pr-3 flex items-center right-0 top-0 bottom-0">
                            <FontAwesomeIcon className="w-5 h-5 text-red-600" icon={faCircleExclamation} />
                        </div>
                        }
                    </div>
                    {
                    errors.codigo?.message && <p className="text-sm text-red-600">{errors.codigo?.message }</p>
                    }
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        DESCRIPCION 
                    </label>
                    <div className="mt-2 relative">
                        <input
                            type="text"
                            id="descripcion"
                            autoComplete="given-name"
                            {...register("descripcion")}
                            className={`relative block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                                ${errors.descripcion?.message ? 'focus:ring-red-600 ring-red-300' : 'focus:ring-indigo-600'}`}
                        />
                        {
                        errors.descripcion?.message && 
                            <div className="absolute pr-3 flex items-center right-0 top-0 bottom-0">
                            <FontAwesomeIcon className="w-5 h-5 text-red-600" icon={faCircleExclamation} />
                            </div>
                        }
                    </div>
                    {
                    errors.descripcion?.message && <p className="text-sm text-red-600">{errors.descripcion?.message }</p>
                    }
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        DESCRIPCION ADICIONAL
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="about"
                        rows={3}
                        {...register("descripcion_adicional")}
                        className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                        />
                    </div>
                </div>

                <div className="sm:col-span-3 relative">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    COSTO
                    </label>
                    <div className="mt-2 relative">
                        <input
                            type="number"
                            id="costo"
                            {...register("costo")}
                            className={`relative block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                              ${errors.costo?.message ? 'focus:ring-red-600 ring-red-300' : 'focus:ring-indigo-600'}`}
                        />
                        {
                        errors.costo?.message && 
                            <div className="absolute pr-3 flex items-center right-0 top-0 bottom-0">
                            <FontAwesomeIcon className="w-5 h-5 text-red-600" icon={faCircleExclamation} />
                            </div>
                        }
                    </div>
                    {
                    errors.costo?.message && <p className="text-sm text-red-600">{errors.costo?.message }</p>
                    }
                </div>

                <div className="sm:col-span-3 relative">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Stock
                    </label>
                    <div className="mt-2 relative">
                        <input
                            type="text"
                            id="stock"
                            {...register("stock")}
                            className={`relative block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                              ${errors.stock?.message ? 'focus:ring-red-600 ring-red-300' : 'focus:ring-indigo-600'}`}
                        />
                        {
                        errors.stock?.message && 
                            <div className="absolute pr-3 flex items-center right-0 top-0 bottom-0">
                            <FontAwesomeIcon className="w-5 h-5 text-red-600" icon={faCircleExclamation} />
                            </div>
                        }
                    </div>
                    {
                      errors.stock?.message && <p className="text-sm text-red-600">{errors.stock?.message }</p>
                    }
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Precio de Venta
                  </label>
                  <div className="mt-2 relative">
                      <input
                          type="text"
                          id="pass"
                          autoComplete="given-name"
                          {...register("precio_vta")}
                          className={`relative block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                              ${errors.precio_vta?.message ? 'focus:ring-red-600 ring-red-300' : 'focus:ring-indigo-600'}`}
                      />
                      {
                      errors.precio_vta?.message && 
                          <div className="absolute pr-3 flex items-center right-0 top-0 bottom-0">
                          <FontAwesomeIcon className="w-5 h-5 text-red-600" icon={faCircleExclamation} />
                          </div>
                      }
                  </div>
                  {
                    errors.precio_vta?.message && <p className="text-sm text-red-600">{errors.precio_vta?.message }</p>
                  }
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Precio de Oferta
                  </label>
                  <div className="mt-2 relative">
                    <input
                      type="text"
                      id="precio_oferta"
                      autoComplete="family-name"
                      {...register("precio_oferta")}
                      className={`relative block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
                        ${errors.precio_oferta?.message ? 'focus:ring-red-600 ring-red-300' : 'focus:ring-indigo-600'}`}
                    />
                    {
                      errors.precio_oferta?.message && 
                          <div className="absolute pr-3 flex items-center right-0 top-0 bottom-0">
                          <FontAwesomeIcon className="w-5 h-5 text-red-600" icon={faCircleExclamation} />
                          </div>
                      }
                  </div>
                  {
                    errors.precio_oferta?.message && <p className="text-sm text-red-600">{errors.precio_oferta?.message }</p>
                  }
                </div>
                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input 
                            id="file-upload" 
                            type="file" 
                            className="sr-only"
                            {...register("file")} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {
                    errors.file?.message && <p className="text-sm text-red-600">{errors.precio_oferta?.message }</p>
                  }
                </div>
                <fieldset>
                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                    id="oferta"
                                    type="checkbox"
                                    {...register("oferta")}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                    OFERTA 
                                </label>
                            </div>
                            </div>
                            <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                id="destacado"
                                type="checkbox"
                                {...register("destacado")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="candidates" className="font-medium text-gray-900">
                                    DESTACADO 
                                </label>
                            </div>
                            </div>
                            <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                    id="activo"
                                    type="checkbox"
                                    {...register("activo")}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="offers" className="font-medium text-gray-900">
                                    ACTIVO 
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
              
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {cargando ? 
                'Cargando...': 'Grabar'
            }
          </button>
        </div>
      </form>
    </div>
  )
}
