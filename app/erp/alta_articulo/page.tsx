"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articuloSchema } from '../../validaciones/articulo';
import TabsArticulo from '@/app/ui/erp/alta_articulo/TabsArticulo';

type Inputs = {
  codigo: string | null,
  descripcion: string,
  descripcion_adicional: string,
  costo: string,
  stock: string,
  precio_vta: string,
  precio_oferta: string,
  oferta: string,
  activo: any,
}

import FichaArticulo from '@/app/ui/erp/alta_articulo/FichaArticulo';
import PreciosArticulo from '@/app/ui/erp/alta_articulo/PreciosArticulo';
import CheckArticulo from '@/app/ui/erp/alta_articulo/CheckArticulo';
import Componentes from '@/app/ui/erp/alta_articulo/Componentes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DbConsultarArticulo } from '@/app/lib/data';
import Alerta from '@/app/ui/erp/alerta';

const tabs = [
  { name: 'Ficha', id: '0', current: true },
  { name: 'Componentes', id: '1', current: false },
];


export default function alta_articulo() {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState({
    mostrar: false,
    mensaje: '',
    titulo: '',
    icono: '',
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [tab, setTab] = useState(0)

  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues } = useForm<Inputs>({
    defaultValues: {
      codigo: '',
      descripcion: '',
      descripcion_adicional: '',
      costo: '',
      stock: '',
      precio_vta: '',
      precio_oferta: '',
      activo: true,
    },
    resolver: zodResolver(articuloSchema)
  })

  const cerrarAlerta = () => {
    setError({
      mostrar: false,
      mensaje: '',
      titulo: '',
      icono: '',
    });
  }

  const seleccionarTab = (tab: any) => {
    setTab(tab)
  }

  const enviarForm = async (data: any) => {
    if (cargando) {
      return
    }
    setCargando(true);
    data.activo = data.activo ? 'S' : 'N';
    const response = await fetch('http://localhost:8080/articulos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Se creo el articulo")
      setCargando(false);
    } else {
      const errorMessage = await response.json(); 
      alert(errorMessage.message); 
      setCargando(false);
    }
  };

  const consultarArticulo = async () => {
    if (cargando) {
      return
    }
    setCargando(true);

    const params = new URLSearchParams(searchParams);
    let codigo:string | null = getValues('codigo');
    if (codigo) {
      params.set('codigo', codigo);
    } else {
      params.delete('codigo');
    }
    replace(`${pathname}?${params.toString()}`);

    const respuesta = await DbConsultarArticulo(codigo);
    const data = await respuesta.json();

    if (respuesta.ok) {

      setValue('codigo', data.codigo);
      setValue('descripcion', data.descripcion);
      setValue('descripcion_adicional', data.descripcion_adicional);
      setValue('costo', data.costo);
      setValue('stock', data.stock);
      setValue('precio_vta', data.precio_vta);
      setValue('precio_oferta', data.precio_oferta);
      setValue('oferta', data.oferta);
      data.activo == 'S' ? setValue('activo', true) : setValue('activo', false)

      setCargando(false);
    } else {
      setValue('codigo', '');
      setValue('descripcion', '');
      setValue('descripcion_adicional', '');
      setValue('costo', '');
      setValue('stock', '');
      setValue('precio_vta', '');
      setValue('precio_oferta', '');
      setValue('oferta', '');
      setValue('activo', true);

      setCargando(false);

      setError({
        mostrar: true,
        mensaje: data.message,
        titulo: 'Oops...',
        icono: 'error-icon',
      });
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let codigo:string | null = params.get('codigo');
    if (codigo != '' && codigo != null) {
      setValue('codigo', codigo);
      consultarArticulo();
    }
  }, []);

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
                consultarArticulo={consultarArticulo}
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
                getValues={getValues}
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
              Guardar
            </button>
          </div>
        </form>
        <Alerta
          abrir={error.mostrar}
          cerrar={cerrarAlerta}
          titulo={error.titulo}
          texto={error.mensaje}
        />
      </div>
    </div>
  )
}
