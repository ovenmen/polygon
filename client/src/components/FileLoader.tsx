import type { FC } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { fetcher } from 'src/utils/fetcher';

interface IFileLoader {
    form?: string
}

interface Inputs {
    file: FormDataEntryValue
}

const validationSchema = Yup.object().required();

const FileLoader: FC<IFileLoader> = ({
    form
}) => {
    const { mutate } = useSWRConfig();
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });

    const { trigger } = useSWRMutation('http://localhost:5000/api/upload/files', fetcher.upload);

    const onSubmit: SubmitHandler<Inputs> = async ({
        file
    }) => {
        try {
            const image = file[0];
            await trigger({ file: image });
            mutate('http://localhost:5000/api/media');
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        reset({ file: '' });
    }, [isSubmitSuccessful, reset]);

    return (
        <form id={form} onSubmit={handleSubmit(onSubmit)}>
            <input
                type="file"
                {...register("file")}
                className="block w-full text-sm file:transition file:ease-in-out file:duration-300 file:mr-4 file:rounded-md file:p-3 file:bg-sky-500 file:hover:bg-sky-600 file:hover:cursor-pointer file:text-white file:border-0"
                multiple
            />
            {errors.file && <span className="text-red-500">{errors.file.message}</span>}
        </form>
    );
};

export default FileLoader;
