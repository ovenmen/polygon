'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import fetcher from '../../tools/fetcher';

interface IFormInputs {
    login: string
    password: string
}

const SiginForm = () => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoadingData, setLoadingData] = useState(false);

    const validationSchema = Yup.object({
        login: Yup
            .string()
            .min(6, 'Логин слишком короткий')
            .email('Логин должен быть в формате email')
            .required('Логин обязателен'),
        password: Yup
            .string()
            .min(8, 'Пароль слишком короткий')
            .required('Пароль обязателен')
    });

    const onSubmit = async ({ login, password }: IFormInputs) => {
        const { error, isLoading, data } = await fetcher('http://localhost:5000/users/sigin', { login, password }, null);

        if (error) {
            setErrorMessage(error);
        }

        setLoadingData(isLoading);
        setUser(data);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            login: 'det-anton@yandex.ru',
            password: ''
        },
        resolver: yupResolver(validationSchema)
    });

    return (
        <div className="flex justify-center items-center w-[vw] h-[100vh] bg-gradient-to-r from-purple-500 to-pink-500">
            <form className="w-[400px] bg-gray-100 p-5 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
                {errorMessage && (
                    <p className="text-white text-center text-lg mb-6 p-3 bg-rose-500 rounded-md">{errorMessage}</p>
                )}
                <div className="mb-3">
                    <label htmlFor="login" className="sr-only">Login</label>
                    <input className="block border border-gray-600 w-full p-2 rounded outline-none focus:border-cyan-600" placeholder="login" {...register('login')} />
                    <p className="text-rose-500">{errors.login?.message}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input className="block border border-gray-600 w-full p-2 rounded focus:outline-none focus:border-cyan-600" placeholder="Password" {...register('password')} />
                    <p className="text-rose-500">{errors.password?.message}</p>
                </div>
                <button type="submit" className="w-full bg-sky-600 rounded p-2 text-white mt-5 disabled:bg-sky-200" disabled={isLoadingData}>Sign in</button>
            </form>
        </div>
    );
};

export default SiginForm;
