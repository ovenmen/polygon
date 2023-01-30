import type { FC } from 'react';
import React from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import type { IArticle } from 'src/utils/fetcher';
import { fetcher } from 'src/utils/fetcher';
import Aside from './Aside';

interface IEditArticle {
    id: string
}

interface Inputs {
    header: string
    shortDescription: string
    fullDescription: string
    cover: string
}

const validationSchema = Yup.object({
    header: Yup
        .string()
        .required('Обязательное поле'),
}).required();

const EditArticle: FC<IEditArticle> = ({
    id
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });
    const { data, error, isLoading } = useSWR(`http://localhost:5000/api/articles/${id}`, fetcher.get);
    const { trigger, isMutating } = useSWRMutation(`http://localhost:5000/api/articles`, fetcher.change);

    const onSubmit: SubmitHandler<Inputs> = async ({
        header,
        shortDescription,
        fullDescription
    }) => {
        try {
            await trigger({
                id,
                header,
                shortDescription,
                fullDescription
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="text-lg text-center">Loading...</div>
        );
    }

    if (error) {
        return (
            <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2 w-96 mx-auto">
                Ошибка запроса
            </p>
        );
    }

    const {
        header,
        shortDescription,
        fullDescription,
        content,
        modifiedDate,
        createdDate,
        user
    } = data.article as IArticle;
    const author = user.at(0);

    return (
        <div className="grid grid-cols-[1fr_300px] h-[calc(100vh-52px)]">
            <article className="p-5 w-full mx-auto">
                <h1 className="text-3xl text-center my-5">Edit article</h1>
                <form onSubmit={handleSubmit(onSubmit)} id="edit-article-form">
                    <p className="mb-3">
                        <label htmlFor="header">Header:</label>
                        <input
                            type="text"
                            className="bg-slate-100 w-full rounded-md p-2 block focus:ring-sky-500 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
                            placeholder="Header article"
                            {...register("header")}
                            defaultValue={header}
                        />
                        {errors.header && <span className="text-red-500">{errors.header.message}</span>}
                    </p>
                    <p className="mb-3">
                        <label htmlFor="shortDescription">Short description:</label>
                        <textarea
                            className="bg-slate-100 w-full rounded-md p-2 block focus:ring-sky-500 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
                            placeholder="Header article"
                            {...register("shortDescription")}
                            defaultValue={shortDescription}
                            rows={2}
                        ></textarea>
                        {errors.shortDescription && <span className="text-red-500">{errors.shortDescription.message}</span>}
                    </p>
                </form>
            </article>
            <Aside
                title="Article data"
                user={author}
                modifiedDate={modifiedDate}
                createdDate={createdDate}
                isMutation={isMutating}
                form="edit-article-form"
            />
        </div>
    );
};

export default EditArticle;
