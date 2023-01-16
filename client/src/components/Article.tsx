import type { FC} from 'react';
import React from 'react';

import useSWR from 'swr';
import { fetcher } from 'src/utils/fetcher';

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

    const { header } = data.article;

    return (
        <section>
            <h1 className="text-3xl text-center my-5">{header}</h1>
        </section>
    );
};

export default Article;
