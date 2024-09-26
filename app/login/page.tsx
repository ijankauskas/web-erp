"use client"

import React, { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../validaciones/signIn';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { loginAction } from '../actions/auth-action';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import InputCommon from '../ui/inputCommon';
import { Spinner } from '@nextui-org/react';
import { getSession } from 'next-auth/react';
import { dbConsultarToken } from '../lib/data';

type Inputs = {
  email: string,
  password: string,
}

const FormLogin = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<LoadingBarRef | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, watch } = useForm<Inputs>({
    resolver: zodResolver(signInSchema)
  })

  useEffect(() => {
    if (ref.current) {
      ref.current.complete();
    }
  }, []);

  const enviarForm = async (data: Inputs) => {
    setError(false);
    setCargando(true);
    ref.current?.continuousStart();
    const respuesta = await loginAction(data)
    if (respuesta.error) {
      ref.current?.complete();
      setCargando(false);
      setError(true);
    } else {
      const session = await getSession();
      
      const token = await dbConsultarToken(session.user)
      
      setCargando(false);
      ref.current?.complete();
      router.push("/erp");
    }
  };

  return (
    <div className="flex h-screen">
      <div>
        <LoadingBar color='rgb(99 102 241)' ref={ref} />
      </div>
      {/* Left side */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-12 bg-white sm:px-12 lg:flex-none lg:px-24 lg:py-32">
        <div className="mx-auto w-full max-w-lg lg:w-[28rem]">
          <div>
            <img className="h-11" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
            <h2 className="mt-16 text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesion en tu cuenta</h2>
          </div>
          <div className="mt-10">
            {cargando && (
              <span className='flex justify-center text-sm'><Spinner size="sm" className='mr-1' />Cargando...</span>
            )}
            {error && (
              <span className='flex justify-center text-sm text-red-500'>Credenciales invalidas.</span>
            )}
            <form className="space-y-7" onSubmit={handleSubmit(data => enviarForm(data))}>
              <div className='h-20'>
                <InputCommon
                  titulo={"Email"}
                  tipo={"email"}
                  error={errors.email?.message}
                  id="email"
                  useForm={register("email")}
                />
              </div>

              <div className='h-20'>
                <InputCommon
                  titulo={"Contraseña"}
                  tipo={"password"}
                  error={errors.password?.message}
                  id="password"
                  useForm={register("password")}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Iniciar Sesion
                </button>
              </div>
            </form>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">O continua con</span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-50"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="#4285F4"
                      d="M488 261.8c0-15.5-1.3-30.4-3.8-45H250v85h134.2c-5.8 29.4-22.9 54.3-47.9 71v59h77.3c45.2-41.6 71.4-103 71.4-175z"
                    />
                    <path
                      fill="#34A853"
                      d="M250 500c64.8 0 119.1-21.5 158.8-58.1l-77.3-59c-21.7 14.6-49.5 23.3-81.5 23.3-62.8 0-116.1-42.3-135.3-99.1H29v62.6C68.8 451.8 154.3 500 250 500z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M114.7 302.1c-7.7-23.1-12.1-47.7-12.1-72.1s4.4-49 12.1-72.1V95.3H29C10.6 132.4 0 171.9 0 211.8s10.6 79.5 29 116.6l85.7-66.3z"
                    />
                    <path
                      fill="#EA4335"
                      d="M250 100c35.3 0 66.9 12.2 91.8 36.2l68.9-68.9C358.8 25.6 305.8 0 250 0 154.3 0 68.8 48.2 29 123.4l85.7 66.3C133.9 142.3 187.2 100 250 100z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden w-1/2 lg:flex items-center justify-center bg-indigo-700">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default FormLogin;
