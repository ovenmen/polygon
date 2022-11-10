'use client';

import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import fetcher from '../../tools/fetcher';

import LoginInput from './Login-input';
import PasswordInput from './Password-input';

const SiginForm = () => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoadingData, setLoadingData] = useState(false);

    const initialValues = {
        login: '',
        password: ''
    };

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

    const handleSubmit = async ({ login, password }) => {
        const { error, isLoading, data } = await fetcher('http://localhost:5000/users/sigin', { login, password }, null);

        if (error) {
            setErrorMessage(error);
        }

        setLoadingData(isLoading);
        setUser(data);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <div className="flex justify-center items-center w-[vw] h-[100vh] bg-gradient-to-r from-purple-500 to-pink-500">
                    <Form className="w-[400px] bg-gray-100 p-5 rounded-lg">
                        <div>
                            <LoginInput name="login" type="email" autoComplete="email" placeholder="Login" label="login" />
                            <PasswordInput name="password" type="password" autoComplete="password" placeholder="Password" label="password" />
                        </div>
                        {errorMessage && <h3 className="text-rose-500">{errorMessage}</h3>}
                        <div>
                            <button type="submit" className="w-full bg-sky-600 rounded p-2 text-white mt-5 disabled:bg-sky-300" disabled={formik.isSubmitting}>Sign in</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default SiginForm;
