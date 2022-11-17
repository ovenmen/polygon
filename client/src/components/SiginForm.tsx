import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setToken } from '../__data__/slices/app';
import { useDispatch } from 'react-redux';

interface IFormInputs {
    login: string
    password: string
}

const SiginForm = () => {
    const [errorFetch, setErrorFetch] = useState('');
    const dispatch = useDispatch();
  
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

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            login: 'det-anton@yandex.ru',
            password: 'I71&fyh5'
        },
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async ({ login, password }: IFormInputs) => {
        const response = await fetch('http://localhost:5000/users/sigin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        });
        const data = await response.json();
        const { error, token } = data;

        if (error) {
            setErrorFetch(error);
        }

        if (token) {
            dispatch(setToken(token));
        }
    };

    return (
        <form className="w-[400px] bg-gray-100 p-5 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
            {errorFetch && (
                <p className="text-white text-center text-lg mb-6 p-3 bg-rose-500 rounded-md">{errorFetch}</p>
            )}
            <div className="mb-3">
                <input type="text" className="block border border-gray-600 w-full p-2 rounded outline-none focus:border-cyan-600" placeholder="login" autoComplete="login" {...register('login')} />
                <p className="text-rose-500">{errors.login?.message}</p>
            </div>
            <div className="mb-3">
                <input type="password" className="block border border-gray-600 w-full p-2 rounded focus:outline-none focus:border-cyan-600" placeholder="Password" autoComplete="current-password" {...register('password')} />
                <p className="text-rose-500">{errors.password?.message}</p>
            </div>
            <button type="submit" className="w-full bg-sky-600 rounded p-2 text-white mt-5 disabled:bg-sky-200">Sign in</button>
        </form>
    );
};

export default SiginForm;
