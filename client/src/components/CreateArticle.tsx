import type { FC } from 'react';
import React from 'react';
import useSWRMutation from 'swr/mutation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

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
}).required();

const CreateArticle: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });
    const { trigger, isMutating } = useSWRMutation('http://localhost:5000/api/articles', fetcher.post);

    const onSubmit: SubmitHandler<Inputs> = async ({
        header,
        shortDescription,
        fullDescription
    }) => {
        try {
            await trigger({
                header,
                shortDescription,
                fullDescription
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div className="grid grid-cols-[1fr_300px] h-[calc(100vh-52px)]">
            <article className="p-5 w-full mx-auto">
                <h1 className="text-3xl text-center my-5">Create article</h1>
                <form onSubmit={handleSubmit(onSubmit)} id="create-article-form">
                    <p className="mb-3">
                        <label htmlFor="header">Header:</label>
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
                            placeholder="Header article"
                            {...register("shortDescription")}
                            defaultValue=""
                            rows={2}
                        ></textarea>
                        {errors.shortDescription && <span className="text-red-500">{errors.shortDescription.message}</span>}
                    </p>
                </form>
            </article>
            <Aside
                title="Article data"
                isMutation={isMutating}
                form="create-article-form"
            />
        </div>
    );
};

export default CreateArticle;
