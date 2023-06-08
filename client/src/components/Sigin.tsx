import React, { useState } from 'react';
import type { FC } from 'react';
import type { SubmitHandler} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import useSWRMutation from 'swr/mutation';

import { fetcher } from 'src/utils/fetcher';
import { cookie } from 'src/utils/cookies';
import SubmitSiginButton from './buttons/submit-login-button';
import { apiUrls } from 'src/utils/api-urls';

interface Inputs {
    login: string
    password: string
}

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
}).required();

const Sigin: FC = () => {
    const [errorMutation, setErrorMutation] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });
    const { trigger, error, isMutating } = useSWRMutation(apiUrls.sigin, fetcher.post);

    const onSubmit: SubmitHandler<Inputs> = async ({ login, password }) => {
        try {
            const result = await trigger({ login, password });
            setErrorMutation(result.error);
            if (result.token) {
                cookie.set('accessToken', result.token);
                window.location.replace('/admin');
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="sigin-form">
            {error && (
                <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2">
                    Ошибка запроса
                </p>
            )}
            {(errors.login || errors.password || errorMutation) && (
                <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2">
                    Неверный логин или пароль
                </p>
            )}
            <p className="mb-3">
                <input
                    type="text"
                    className="bg-slate-100 w-full rounded-md p-2 block focus:ring-sky-500 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2"
                    placeholder="Login"
                    {...register("login")}
                    defaultValue="det-anton@yandex.ru"
                />
                {errors.login && <span className="text-white">{errors.login.message}</span>}
            </p>
            <p className="mb-8">
                <input
                    type="password"
                    className="bg-slate-100 w-full rounded-md p-2 block focus:ring-sky-500 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2"
                    placeholder="Password"
                    {...register("password")}
                    defaultValue="I71&fyh5"
                />
                {errors.password && <span className="text-white">{errors.password.message}</span>}
            </p>
            
            <SubmitSiginButton
                form="sigin-form"
                isMutating={isMutating}
            />
        </form>
    );
};

export default Sigin;
