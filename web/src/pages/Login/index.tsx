import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/Logo.png';
import { IFormInputs } from "./types";
import { schema } from "./formSchema";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "../../components/Buttons/button";

export function Login() {

  const [error, setError] = useState<null | string>(null);
  const [isloadingButtonSubmit, setIsloadingButtonSubmit] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

  const auth = useAuth();
  const history = useNavigate();


  async function handleSignIn(form: IFormInputs) {
    try {
      setIsloadingButtonSubmit(true);
      await auth.authenticate(form.email, form.password);

      history('/admin');
    } catch (error) {
      setIsloadingButtonSubmit(false);
      setError("Credenciais inválidas!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 rounded-lg bg-white p-5 md:p-10 shadow-lg">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="DT-Money"
          />
          {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Entre com sua conta!</h2> */}
        </div>
        <form className="mt-14 space-y-6" noValidate
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none relative block w-full px-3 py-2 mt-3 border placeholder-gray-500 text-gray-900 rounded focus:outline-none  focus:z-10 sm:text-sm 
                ${errors.email ? 'border-red-600 focus:border-red-700' : ''}`}
                placeholder="Email"
              />
              <small className="text-red-600">{errors.email?.message}</small>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none relative block w-full px-3 py-2 mt-3 border placeholder-gray-500 text-gray-900 rounded focus:outline-none  focus:z-10 sm:text-sm 
                ${errors.password ? 'border-red-600 focus:border-red-700' : ''}`}
                placeholder="Senha"
              />
              <small className="text-red-600">{errors.password?.message}</small>
            </div>
          </div>

          {
            error ?
              <div className="text-white h-12 w-full bg-red-600 flex items-center px-3 rounded">
                <p>{error}</p>
              </div>
              : <div></div>
          }
          <div>
            <Button className="text-white" type="submit" labelName="Entrar" color="bg-gray-700" dimension="" hover="hover:bg-gray-800" isLoading={isloadingButtonSubmit} />
          </div>
        </form>
        {/* <div className="flex">
          <div className="border-t-2 border-gray-4 w-full"></div>
          <div className="w-16"></div>
          <div className="border-t-2 border-gray-4 w-full"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link to="/sign-in" className="font-medium text-green-light hover:text-green-default">
              Ainda não tem conta?
            </Link>
          </div>

          <div className="text-sm">
            <Link to="/" className="font-medium text-green-light hover:text-green-default">
              Esqueceu sua senha?
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  )
}
