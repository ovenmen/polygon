import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import { useSiginMutation } from '../__data__/services/auth';
import { setToken } from '../__data__/slices/app';

interface IFormInputs {
    login: string
    password: string
}

interface IResponseMutation {
    data: {
        success: boolean
        title: string
        token: string
    },
    isLoading: boolean,
    error?: {
        data: {
            error: string
        }
    }
}

const SiginForm: FC = () => {
    const dispatch = useDispatch();
    const [setAuth, { isLoading, error }] = useSiginMutation<IResponseMutation>();

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
        try {
            const response = await setAuth({ login, password }) as IResponseMutation;
            const { token } = response?.data;

            if (token) {
                dispatch(setToken(token));
            }
        } catch (error) {
            
        }
    };

    return (
        <form className="w-[400px] bg-gray-100 p-5 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <p className="text-white text-center text-lg mb-6 p-3 bg-rose-500 rounded-md">{error?.data?.error || 'Ошибка запроса'}</p>
            )}
            <div className="mb-3">
                <input type="text" className="block border border-gray-600 w-full p-2 rounded outline-none focus:border-cyan-600 focus:ring-2" placeholder="login" autoComplete="login" {...register('login')} />
                <p className="text-rose-500">{errors.login?.message}</p>
            </div>
            <div className="mb-3">
                <input type="password" className="block border border-gray-600 w-full p-2 rounded focus:outline-none focus:border-cyan-600 focus:ring-2" placeholder="Password" autoComplete="current-password" {...register('password')} />
                <p className="text-rose-500">{errors.password?.message}</p>
            </div>
            <button type="submit" className="w-full bg-sky-600 rounded p-2 text-white mt-5 disabled:bg-sky-200 focus:ring-2">
                {isLoading ? 'Отправка данных...' : 'Sign in'}
            </button>
        </form>
    );
};

export default SiginForm;
