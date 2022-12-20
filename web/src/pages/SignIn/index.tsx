import React, { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "../../components/Buttons/button";
import { schema } from "./formSchema";
import { useForm } from "react-hook-form";
import Logo from '../../assets/Logo.png';
import { IFormInputs } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import { useAuth } from "../../contexts/auth/useAuth";
import { AxiosError } from "axios";

export function SignIn() {
    const history = useNavigate();
    const auth = useAuth();

    const [error, setError] = useState<null | string>(null);
    const [isloadingButtonSubmit, setIsloadingButtonSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });

    async function handleSignIn(form: IFormInputs) {
        try {
            setIsloadingButtonSubmit(true);
            await Api.post('/user/create', form);
            await auth.authenticate(form.email, form.password);

            history('/transactions');
        } catch (error) {
            setIsloadingButtonSubmit(false);
            setError("Ocorreu um erro ao cadastrar");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-1 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 rounded-lg bg-gray-2 p-10">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src={Logo}
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
                                className={`appearance-none relative block w-full px-3 py-2 mt-3 border-2 placeholder-gray-500 text-gray-900 rounded focus:outline-none  focus:border-green-light focus:z-10 sm:text-sm 
                ${errors.email ? 'border-red-default focus:border-red-default' : ''}`}
                                placeholder="Email"
                            />
                            <small className="text-red-default">{errors.email?.message}</small>
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Nome
                            </label>
                            <input
                                {...register('name')}
                                id="name"
                                name="name"
                                type="text"
                                required
                                className={`appearance-none relative block w-full px-3 py-2 mt-3 border-2 placeholder-gray-500 text-gray-900 rounded focus:outline-none  focus:border-green-light focus:z-10 sm:text-sm 
                ${errors.name ? 'border-red-default focus:border-red-default' : ''}`}
                                placeholder="Nome"
                            />
                            <small className="text-red-default">{errors.name?.message}</small>
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
                                className={`appearance-none relative block w-full px-3 py-2 mt-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-green-light focus:border-green-light focus:z-10 sm:text-sm
                ${errors.password ? 'border-red-default focus:border-red-default' : ''}`}
                                placeholder="Senha"
                            />
                            <small className="text-red-default">{errors.password?.message}</small>
                        </div>
                    </div>

                    {
                        error ?
                            <div className="text-white h-12 w-full bg-red-dark flex items-center px-3 rounded">
                                <p>{error}</p>
                            </div>
                            : <div></div>
                    }
                    <div>
                        <Button type="submit" labelName="Cadastar" color="bg-green-default" dimension="" hover="hover:bg-green-dark" isLoading={isloadingButtonSubmit} />
                    </div>
                </form>
                <div className="flex">
                    <div className="border-t-2 border-gray-4 w-full"></div>
                    <div className="w-16"></div>
                    <div className="border-t-2 border-gray-4 w-full"></div>
                </div>
                <div className="flex items-center justify-center">

                    <div className="text-sm">
                        <Link to="/login" className="font-medium text-green-light hover:text-green-default">
                            Já tem uma conta?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};