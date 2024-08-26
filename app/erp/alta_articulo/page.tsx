"use client"
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articuloSchema } from '../../validaciones/articulo';
import TabsArticulo from '@/app/ui/erp/alta_articulo/TabsArticulo';
import FichaArticulo from '@/app/ui/erp/alta_articulo/FichaArticulo';
import PreciosArticulo from '@/app/ui/erp/alta_articulo/PreciosArticulo';
import CheckArticulo from '@/app/ui/erp/alta_articulo/CheckArticulo';
import Componentes from '@/app/ui/erp/alta_articulo/Componentes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DbConsultarArticulo, DbGrabartarArticulo } from '@/app/lib/data';
import Alerta from '@/app/ui/erp/alerta';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import DismissibleAlert from '@/app/ui/DismissAlerta';

type Inputs = {
  codigo: string | null,
  descripcion: string,
  descripcion_adicional: string,
  agru_1: string,
  agru_2: string,
  agru_3: string,
  costo: string,
  stock: string,
  precio_vta: string,
  precio_oferta: string,
  iva: string,
  oferta: string,
  activo: any,
  componentes: {
  cod_articulo: string;
  cod_articulo_compo: string;
  descripcion: string;
  unidad: any;
  cantidad: number;
  }[]
}



const tabs = [
  { name: 'Ficha', id: '0', current: true },
  { name: 'Componentes', id: '1', current: false },
];

export default function alta_articulo() {
  const [cargando, setCargando] = useState(false);
  const ref = useRef<LoadingBarRef | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.complete();
    }
  }, []);

  const [alerta, setAlerta] = useState({
    message: "",
    type: "",
    alertVisible: false
  });

  const closeAlertaDismiss = () => {
    setAlerta({
      message: '',
      type: "",
      alertVisible: false
    });
  };

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

  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, watch } = useForm<Inputs>({
    defaultValues: {
      codigo: '',
      descripcion: '',
      descripcion_adicional: '',
      agru_1: '',
      agru_2: '',
      agru_3: '',
      costo: '',
      stock: '',
      precio_vta: '',
      precio_oferta: '',
      iva: '21',
      activo: true,
      componentes: [{
        cod_articulo: '',
        cod_articulo_compo: '',
        descripcion: '',
        unidad: '',
        cantidad: 0
      }],
    },
    resolver: zodResolver(articuloSchema)
  })

  const [articulosCompo, setArticulosCompo] = useState<{
    error: boolean; cod_articulo: string, cod_articulo_compo: string, descripcion: string, unidad: string, cantidad: number
  }[]>([]);

  useEffect(() => {
    setValue('componentes', articulosCompo);
  }, [articulosCompo]);

  const cerrarAlerta = () => {
    setError({
      mostrar: false,
      mensaje: '',
      titulo: '',
      icono: '',
    });
  }

  const seleccionarTab = (tab: any) => {
    let codigo: string | null = getValues('codigo');
    if (!codigo) {
      setError({
        mostrar: true,
        mensaje: 'Primero selecciona un articulo.',
        titulo: 'Oops...',
        icono: 'error-icon',
      });
      return
    }
    setTab(tab)
  }

  const enviarForm = async (data: any) => {
    if (cargando) {
      return
    }

    data.activo = data.activo || data.activo == 'S' ? 'S' : 'N';

    setCargando(true);
    ref.current?.continuousStart();

    const response = await DbGrabartarArticulo(data)

    if (response.ok) {
      ref.current?.complete();
      setCargando(false);
      setAlerta({
        message: 'Se guardo correctamente el articulo',
        type: "success",
        alertVisible: true
      });
    } else {
      const errorMessage = await response.json();
      ref.current?.complete();
      setCargando(false);
      setAlerta({
        message: errorMessage.message,
        type: "error",
        alertVisible: true
      });
    }
  };

  useEffect(() => {
    if (!errors || !errors.componentes || !Array.isArray(errors.componentes)) {
      return; // No hay errores que mostrar
    }
    const errorIndices = new Set(errors.componentes.map((e, index) => index));

    setArticulosCompo((prevObjetos) =>
      prevObjetos.map((obj, index) => ({
        ...obj,
        error: errorIndices.has(index),
      }))
    );

    let mensaje: string = '';

    if (errors.componentes.length > 0) {
      errors.componentes.map((error, index) => {
        mensaje += error.cantidad.message + '\n'
      });
    }
    setError({
      mostrar: true,
      mensaje: mensaje,
      titulo: 'Oops...',
      icono: 'error-icon',
    });

    clearErrors('componentes');
  }, [errors]);

  const consultarArticulo = async () => {
    const params = new URLSearchParams(searchParams);
    let codigo: string | null = getValues('codigo');
    if (codigo) {
      params.set('codigo', codigo);
      replace(`${pathname}?${params.toString()}`);
      clearErrors()
    } else {
      params.delete('codigo');
      replace(`${pathname}?${params.toString()}`);
      clearErrors();
      limpiar();

      return
    }

    if (cargando) {
      return
    }
    setCargando(true);
    ref.current?.continuousStart();

    const respuesta = await DbConsultarArticulo(codigo);
    const data = await respuesta.json();

    if (respuesta.ok) {

      setValue('codigo', data.codigo);
      setValue('descripcion', data.descripcion);
      setValue('descripcion_adicional', data.descripcion_adicional);      
      setValue('agru_1', data.agru_1);
      setValue('agru_2', data.agru_2);
      setValue('agru_3', data.agru_3);
      setValue('costo', data.costo);
      setValue('stock', data.stock);
      setValue('precio_vta', data.precio_vta);
      setValue('precio_oferta', data.precio_oferta);
      setValue('iva', data.iva);
      setValue('oferta', data.oferta);

      data.activo == 'S' ? setValue('activo', true) : setValue('activo', false);
      setArticulosCompo(data.componentes)
      setCargando(false);
      ref.current?.complete();
    } else {
      limpiar()
      setCargando(false);
      ref.current?.complete();
      setError({
        mostrar: true,
        mensaje: data.message,
        titulo: 'Oops...',
        icono: 'error-icon',
      });
    }

  }

  const limpiar = () => {

    setValue('descripcion', '');
    setValue('descripcion_adicional', '');
    setValue('agru_1', '');
    setValue('agru_2', '');
    setValue('agru_3', '');
    setValue('costo', '');
    setValue('stock', '');
    setValue('precio_vta', '');
    setValue('precio_oferta', '');
    setValue('iva', '');
    setValue('oferta', '');
    setValue('activo', true);
    setArticulosCompo([]);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let codigo: string | null = params.get('codigo');
    if (codigo != '' && codigo != null) {
      setValue('codigo', codigo);
      consultarArticulo();
    }
  }, []);


  return (
    <div className="mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
      <div>
        <LoadingBar color='rgb(99 102 241)' ref={ref} />
      </div>
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
                getValues={getValues}
              />
              <CheckArticulo
                register={register}
                setValue={setValue}
                errors={errors}
                clearErrors={clearErrors}
                getValues={getValues}
                watch={watch}
              />
            </> :
            tab == 1 ?
              <>
                <Componentes
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  clearErrors={clearErrors}
                  articulosCompo={articulosCompo}
                  setArticulosCompo={setArticulosCompo}
                  getValues={getValues}
                />
              </> :
              'Posición no definida.'}
          <div className="flex items-end justify-end px-4 py-3 bg-gray-50 text-right sm:px-6">
            <div className='w-40'>
              <ButtonCommon
                texto={"Guardar"}
                type={"submit"}
              />

            </div>
          </div>
        </form>
        <Alerta
          abrir={error.mostrar}
          cerrar={cerrarAlerta}
          titulo={error.titulo}
          texto={error.mensaje}
        />

        {alerta.alertVisible && (
          <DismissibleAlert
            message={alerta.message}
            type={alerta.type}
            onClose={closeAlertaDismiss}
          />
        )}
      </div>
    </div>
  )
}
