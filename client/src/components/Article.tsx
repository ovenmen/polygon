import type { FC } from 'react';
import React from 'react';
import useSWR from 'swr';

import { fetcher } from 'src/utils/fetcher';
import type { IArticle } from 'src/utils/interfaces';
import Aside from './aside';
import { apiUrls } from 'src/utils/api-urls';

interface IProps {
    id: string
}

const Article: FC<IProps> = ({
    id
}) => {
    const { data, error, isLoading } = useSWR(`${apiUrls.articles}/${id}`, fetcher.get);

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
        cover,
        content,
        modifiedDate,
        createdDate,
        user
    } = data.article as IArticle;
    const author = user.at(0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_300px] h-[calc(100vh-52px)]">
            <article className="m-5 px-5 prose prose-md prose-slate w-full mx-auto">
                {header && (
                    <h1 className="text-3xl text-center my-5">{header}</h1>
                )}
                {shortDescription && (
                    <div>{shortDescription}</div>
                )}
                {fullDescription && (
                    <div>{fullDescription}</div>
                )}
                {cover && (
                    <img src={`http://localhost:5000/${cover}`} alt="cover" crossOrigin="anonymous" />
                )}
            </article>
            <Aside
                title="Edit article"
                user={author}
                modifiedDate={modifiedDate}
                createdDate={createdDate}
            />
        </div>
    );
};

export default Article;
