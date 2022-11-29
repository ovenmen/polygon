import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import { useGetArticleQuery } from '../__data__/services/articles';

const ArticlePage: FC = () => {
    const params = useParams();
    const { data, error, isLoading } = useGetArticleQuery(params.id);

    return (
        <MainLayout>
            {isLoading && (
                <p className="w-1/2 mx-auto text-center">Загрузка постов...</p>
            )}
            {error && (
                <p className="bg-rose-500 text-white w-1/2 mx-auto p-4 rounded-md text-center">Ошибка загрузки данных</p>
            )}
            {data && (
                <section className="article container px-3 mx-auto">
                    <button className="fixed top-3 right-3 bg-sky-900 py-2 px-3 text-white">
                        <Link to={`/admin/articles/edit/${data.article._id}`}>Edit</Link>
                    </button>
                    <h1 className="text-5xl text-center mb-5 mt-5">{data.article.header}</h1>
                    <p className="text-slate-500 text-lg">{data.article.fullDescription}</p>
                    <div dangerouslySetInnerHTML={{ __html: data.article.mdContent }} />
                </section>
            )}
        </MainLayout>
    );
};

export default ArticlePage;
