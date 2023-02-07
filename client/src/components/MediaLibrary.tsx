import type { FC } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { API_HOST } from 'src/utils/constants';
import { fetcher } from 'src/utils/fetcher';
import Aside from './Aside';

const MediaLibrary: FC = () => {
    const [fileMetaData, setFileMetaData] = useState(null);
    const { data, error, isLoading } = useSWR(`${API_HOST}/api/media`, fetcher.get);
    const { trigger, isMutating } = useSWRMutation(`${API_HOST}/api/media`, fetcher.delete);
    const { mutate } = useSWRConfig();

    const handleClickFile = useCallback((media, isActive) => {
        isActive ? setFileMetaData(null) : setFileMetaData(media);
    }, []);

    const handleClickRemoveFile = useCallback((id) => {
        trigger({ id });
        mutate(`${API_HOST}/media`);
    }, [mutate, trigger]);

    useEffect(() => {
        if (!data?.media) {
            setFileMetaData(null);
        }
    }, [data]);

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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_450px] h-[calc(100vh-52px)]">
            <section className="p-5 w-full mx-auto">
                <h1 className="text-3xl text-center my-5">Media library</h1>
                {data.error && (
                    <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2 w-96 mx-auto">
                        {data.error}
                    </p>
                )}
                <div className="gap-8 columns-3xs">
                    {data.media && data.media.map(media => {
                        const isActive = media._id === fileMetaData?._id;
                        const isImage = media.mimeType.match(/image/);
                        const isApplication = media.mimeType.match(/application/);

                        if (isImage) {
                            return (
                                <figure
                                    key={media._id}
                                    className={`mb-5 rounded-md bg-gray-100 hover:cursor-pointer p-1 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out ${isActive && "bg-sky-500"}`}
                                    onClick={() => handleClickFile(media, isActive)}
                                >
                                    <img
                                        data-media={media}
                                        crossOrigin="anonymous"
                                        src={`${API_HOST}/${media.url}`}
                                        alt="image"
                                        className="w-full aspect-auto"
                                    />
                                </figure>
                            );
                        }

                        if (isApplication) {
                            return (
                                <div
                                    key={media._id}
                                    className={`grid place-content-center mb-5 rounded-md bg-gray-100 hover:cursor-pointer hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out ${isActive && "bg-sky-500"}`}
                                    onClick={() => handleClickFile(media, isActive)}
                                >
                                    <i className="fa-sharp fa-solid fa-file-pdf fa-3x text-red-600"></i>
                                </div>
                            );
                        }
                    })}
                </div>
            </section>
            <Aside
                title="Media data"
                form="add-media-form"
                operations={['add']}
                isMutating={isMutating}
                fileMetaData={fileMetaData}
                onClickRemoveFile={handleClickRemoveFile}
            />
        </div>
    );
};

export default MediaLibrary;
