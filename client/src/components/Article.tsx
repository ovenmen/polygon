import type { FC} from 'react';
import React from 'react';

import useSWR from 'swr';
import { fetcher } from 'src/utils/fetcher';
import { formatDate } from 'src/utils/dates';

interface IProps {
    id: string
}

const Article: FC<IProps> = ({
    id
}) => {
    const { data, error, isLoading } = useSWR(`http://localhost:5000/api/articles/${id}`, fetcher.get);

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
    } = data.article;
    const author = user.at(0);
    const {
        name,
        login,
        avatar,
        about
    } = author;

    return (
        <section>
            <div className="flex items-center justify-around">
                <figure>
                    <img src={avatar} alt="avatar" className="w-12 rounded-full" />
                </figure>
                <p>{login}</p>
                <p>{name}</p>
                {createdDate && (
                    <p>createdDate: {formatDate.toLocalDate(createdDate)}</p>
                )}
                {modifiedDate && (
                    <p>modifiedDate: {formatDate.toLocalDate(modifiedDate)}</p>
                )}
            </div>
            <h1 className="text-3xl text-center my-5">
                {header}
            </h1>
            <p className="mb-3">
                {shortDescription}
            </p>
            <p className="mb-3">
                {fullDescription}
            </p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </section>
    );
};

export default Article;
