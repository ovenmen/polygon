import { FC, useCallback } from 'react';
import { useState } from 'react';
import React from 'react';
import useSWR from 'swr';

import { fetcher } from 'src/utils/fetcher';
import { formatDate } from 'src/utils/dates';
import Aside from './Aside';

const MediaLibrary: FC = () => {
    const [fileMetaInfo, setFileMetaInfo] = useState(null);
    const { data, error, isLoading } = useSWR('http://localhost:5000/api/media', fetcher.get);

    const handleClickFile = useCallback((media) => {
        setFileMetaInfo(media);
    }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_300px] h-[calc(100vh-52px)]">
            <section className="p-5 w-full mx-auto">
                <h1 className="text-3xl text-center my-5">Media library</h1>
                {data.error && (
                    <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2 w-96 mx-auto">
                        {data.error}
                    </p>
                )}
                <div className="gap-8 columns-3xs">
                    {data.media && data.media.map(media => (
                        <figure key={media._id} className="mb-5 rounded-md bg-gray-100 p-2 hover:cursor-pointer hover:scale-125 hover:shadow-lg transition duration-300 ease-in-out" onClick={() => handleClickFile(media)}>
                            <img
                                data-media={media}
                                crossOrigin="anonymous"
                                src={`http://localhost:5000/${media.url}`}
                                alt="image"
                                className="w-full aspect-auto"
                            />
                        </figure>
                    ))}
                </div>
            </section>
            <Aside
                title="Media data"
                form="add-media-form"
                operations={['save', 'add']}
                fileMetaInfo={fileMetaInfo}
            />
        </div>
    );
};

export default MediaLibrary;
