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
import { API_HOST } from 'src/utils/constants';
import SubmitButton from './buttons/SubmitButton';

interface Inputs {
    files: FormDataEntryValue
}

interface IProps {
    form?: string
}

const validationSchema = Yup.object().required();

const FileLoader: FC<IProps> = ({
    form
}) => {
    const { mutate } = useSWRConfig();
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });

    const { trigger, isMutating } = useSWRMutation(`${API_HOST}/api/upload/files`, fetcher.upload);

    const onSubmit: SubmitHandler<Inputs> = async ({
        files
    }) => {
        try {
            const formData = new FormData();
            formData.append('file_0', files[0]);
            formData.append('file_1', files[1]);
            formData.append('file_2', files[2]);
            formData.append('file_3', files[3]);
            formData.append('file_4', files[4]);

            await trigger(formData);
            mutate(`${API_HOST}/api/media`);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        reset({ files: '' });
    }, [isSubmitSuccessful, reset]);

    return (
        <form id={form} onSubmit={handleSubmit(onSubmit)}>
            <input
                type="file"
                {...register("files")}
                className="block w-full file:transition file:ease-in-out file:duration-300 file:mr-4 file:rounded-md file:px-3 file:py-2 file:bg-sky-500 file:hover:bg-sky-600 file:hover:cursor-pointer file:text-white file:border-0"
                multiple
            />
            {errors.files && <span className="text-red-500">{errors.files.message}</span>}
            <SubmitButton
                form={form}
                isMutating={isMutating}
            />
        </form>
    );
};

export default FileLoader;
