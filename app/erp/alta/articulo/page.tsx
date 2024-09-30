"use client"
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articuloSchema } from '../../../validaciones/articulo';
import FichaArticulo from '@/app/ui/erp/alta_articulo/FichaArticulo';
import PreciosArticulo from '@/app/ui/erp/alta_articulo/PreciosArticulo';
import CheckArticulo from '@/app/ui/erp/alta_articulo/CheckArticulo';
import Componentes from '@/app/ui/erp/alta_articulo/Componentes';
import { DbBorrarArticulo, DbConsultarArticulo, DbGrabartarArticulo } from '@/app/lib/data';
import Alerta from '@/app/ui/erp/alerta';
import DismissibleAlert from '@/app/ui/DismissAlerta';
import { ClipboardDocumentIcon, ClipboardIcon, CloudArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import ButtonCommon from '@/app/ui/erp/ButtonCommon';
import HeaderPage from '@/app/ui/erp/HeaderPage';
import { Tab, Tabs } from '@nextui-org/react';
import Loading from '@/app/ui/Loading';

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
  usa_compo: any,
  sin_stock: any,
  um: string,
  cant_default: string,
  cod_barras: string,
  costo_iva: string,
}

export default function Alta_articulo() {
  const [cargando, setCargando] = useState(false);
  const [respuesta, setRespuesta] = useState(false);
  const [bloquearEliminar, setBloquearEliminar] = useState(true);

  const [alerta, setAlerta] = useState({
    message: "",
    type: "",
    alertVisible: false
  });

  const closeAlertaDismiss = () => {
    setAlerta((prev) => ({
      ...prev,
      alertVisible: false,
    }));

    setTimeout(() => {
      setAlerta({
        message: '',
        type: "",
        alertVisible: false
      });
    }, 300);
  };

  const [error, setError] = useState({
    mostrar: false,
    mensaje: '',
    titulo: '',
    icono: '',
    botonExtra: false,
    textoExtra: '',
    funcionExtra: () => { }
  });

  const borrarArticulo = () => {
    setError({
      mostrar: true,
      mensaje: 'Se eliminara como el articulo: ' + getValues('descripcion'),
      titulo: 'Estas seguro?',
      icono: 'error-icon',
      botonExtra: true,
      textoExtra: 'Eliminar',
      funcionExtra: () => eliminarArticulo(),
    });
  }

  const eliminarArticulo = async () => {
    setCargando(true);
    setRespuesta(true);
    let articulo = { codigo: getValues("codigo") }
    const response = await DbBorrarArticulo(articulo);
    const mensaje = await response.json();
    if (response.ok) {
      setCargando(false);
      setRespuesta(true);
      setAlerta({
        message: mensaje.message,
        type: "warning",
        alertVisible: true
      });
    } else {
      setCargando(false);
      setRespuesta(false);
      setAlerta({
        message: mensaje.message,
        type: "error",
        alertVisible: true
      });
    }
    limpiar()
    cerrarAlerta();
  };

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
      usa_compo: false,
      sin_stock: false,
      um: 'UNI',
      cant_default: '1',
      cod_barras: '',
      costo_iva: ''
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
    setError((prev) => ({
      ...prev,
      mostrar: false,
    }));

    setTimeout(() => {
      setError({
        mostrar: false,
        mensaje: '',
        titulo: '',
        icono: '',
        botonExtra: false,
        textoExtra: '',
        funcionExtra: () => { }
      });
    }, 300);
  }

  const enviarForm = async (data: any) => {
    if (cargando) {
      return
    }
    setCargando(true);
    setRespuesta(true);

    data.activo = data.activo || data.activo == 'S' ? 'S' : 'N';
    data.usa_compo = data.usa_compo || data.usa_compo == 'S' ? 'S' : 'N';
    data.sin_stock = data.sin_stock || data.sin_stock == 'S' ? 'S' : 'N';

    const response = await DbGrabartarArticulo(data)

    if (response.ok) {
      setCargando(false);
      setRespuesta(true);
      setBloquearEliminar(false)
      setAlerta({
        message: 'Se guardo correctamente el articulo',
        type: "success",
        alertVisible: true
      });
    } else {
      const errorMessage = await response.json();
      setCargando(false);
      setRespuesta(false);
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
      botonExtra: false,
      textoExtra: '',
      funcionExtra: () => { }
    });

    clearErrors('componentes');
  }, [errors]);

  const consultarArticulo = async () => {
    let codigo: string | null = getValues('codigo');
    
    if (cargando) {
      return
    }
    setCargando(true);
    setRespuesta(true);

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

      data.usa_compo == 'S' ? setValue('usa_compo', true) : setValue('usa_compo', false);
      data.sin_stock == 'S' ? setValue('sin_stock', true) : setValue('sin_stock', false);
      setValue('um', data.um);
      setValue('cant_default', data.cant_default);
      setValue('cod_barras', data.cod_barras);
      setValue('costo_iva', data.costo_iva);

      setCargando(false);
      setRespuesta(true);
      setBloquearEliminar(false);
    } else {
      limpiar()
      setCargando(false);
      setRespuesta(false);

      setAlerta({
        message: data.message,
        type: "error",
        alertVisible: true
      });
    }

  }

  const limpiar = () => {
    setBloquearEliminar(true);
    clearErrors();
    
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
    setValue('usa_compo', false);
    setValue('sin_stock', false);
    setValue('um', '');
    setValue('cant_default', '');
    setValue('cod_barras', '');
    setValue('costo_iva', '');
  }

  const btnLimpiar = () => {
    setValue('codigo', '');
    limpiar()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-screen-2xl mx-auto py-0 px-4 sm:px-6 lg:px-8 bg-white">
        <HeaderPage titulo={"Alta de articulos"} />
        <div className='relative '>
          <form action="#" method="POST" onSubmit={handleSubmit(data => enviarForm(data))}>
            <Tabs
              aria-label="Options"
              color={"primary"}
              variant="underlined"
              classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-primary"
              }}
            >
              <Tab
                key="photos"
                title={
                  <div className="flex items-center space-x-2">
                    <ClipboardIcon className="h-6 w-6" />
                    <span>Principal</span>
                  </div>
                }
              >
                <FichaArticulo
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  clearErrors={clearErrors}
                  consultarArticulo={consultarArticulo}
                  getValues={getValues}
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
              </Tab>
              <Tab
                key="music"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Componentes</span>
                  </div>
                }
              >
                <Componentes
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  clearErrors={clearErrors}
                  articulosCompo={articulosCompo}
                  setArticulosCompo={setArticulosCompo}
                  getValues={getValues}
                />
              </Tab>
            </Tabs>

            <div className="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-4">
              <div className='w-[125px]'>
                <ButtonCommon
                  type={"button"}
                  texto={<><ClipboardDocumentIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Limpiar</>}
                  onClick={btnLimpiar}
                  color={"other"}
                />
              </div>
              <div className='w-[125px]'>
                <ButtonCommon
                  type={"submit"}
                  texto={<><CloudArrowUpIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Guardar</>}
                />
              </div>
              <div className='w-[125px]'>
                <ButtonCommon
                  type={"button"}
                  texto={<><TrashIcon aria-hidden="true" className="mr-1.5 h-5 w-5" />Eliminar</>}
                  onClick={borrarArticulo}
                  color={"danger"}
                  desactivado={bloquearEliminar}
                />
              </div>
            </div>

          </form>
          <Alerta
            abrir={error.mostrar}
            cerrar={cerrarAlerta}
            titulo={error.titulo}
            texto={error.mensaje}
            botonExtra={error.botonExtra}
            textoExtra={error.textoExtra}
            funcionExtra={error.funcionExtra}
          />

          <DismissibleAlert
            message={alerta.message}
            type={alerta.type}
            onClose={closeAlertaDismiss}
            showPanel={alerta.alertVisible}
          />
        </div>
      </div>
      <Loading cargando={cargando} respuesta={respuesta} />
    </Suspense>
  )
}
