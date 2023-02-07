import type { FC } from 'react';
import React from 'react';
import useSWRMutation from 'swr/mutation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { API_HOST } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetcher';
import Aside from './Aside';

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
    shortDescription: Yup
        .string(),
    fullDescription: Yup
        .string(),
    cover: Yup
        .string()
}).required();

const CreateArticle: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });

    const { trigger, isMutating } = useSWRMutation(`${API_HOST}/api/articles`, fetcher.post);

    const onSubmit: SubmitHandler<Inputs> = async ({
        header,
        shortDescription,
        fullDescription,
        cover
    }) => {
        try {
            await trigger({
                header,
                shortDescription,
                fullDescription,
                cover
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_300px] h-[calc(100vh-52px)]">
            <article className="p-5 w-full mx-auto">
                <h1 className="text-3xl text-center my-5">Create article</h1>
                <form onSubmit={handleSubmit(onSubmit)} id="create-article-form">
                    <p className="mb-3">
                        <label htmlFor="header" className="after:content-['*'] after:ml-0.5 after:text-red-500">Header: </label>
                        <input
                            type="text"
                            className="bg-slate-100 w-full rounded-md p-2 block focus:ring-sky-500 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
                            placeholder="Header article"
                            {...register("header")}
                            defaultValue=""
                        />
                        {errors.header && <span className="text-red-500">{errors.header.message}</span>}
                    </p>
                    <p className="mb-3">
                        <label htmlFor="shortDescription">Short description:</label>
                        <textarea
                            className="bg-slate-100 w-full rounded-md p-2 block focus:ring-sky-500 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
                            placeholder="Short description"
                            {...register("shortDescription")}
                            defaultValue=""
                            rows={3}
                        ></textarea>
                        {errors.shortDescription && <span className="text-red-500">{errors.shortDescription.message}</span>}
                    </p>
                    <p className="mb-3">
                        <label htmlFor="fullDescription">Full description:</label>
                        <textarea
                            className="bg-slate-100 w-full rounded-md p-2 block focus:ring-sky-500 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
                            placeholder="Full description"
                            {...register("fullDescription")}
                            defaultValue=""
                            rows={6}
                        ></textarea>
                        {errors.fullDescription && <span className="text-red-500">{errors.fullDescription.message}</span>}
                    </p>
                    <p>
                        <label htmlFor="cover">Cover: </label>
                        <input
                            type="text"
                            className="bg-slate-100 w-full rounded-md p-2 block focus:ring-sky-500 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1"
                            placeholder="Url image"
                            {...register("cover")}
                        />
                        {errors.cover && <span className="text-red-500">{errors.cover.message}</span>}
                    </p>
                </form>
            </article>
            <Aside
                title="Article data"
                isMutating={isMutating}
                form="create-article-form"
                operations={['save']}
            />
        </div>
    );
};

export default CreateArticle;
