import React from 'react';
import ArticleCard from '../components/ArticleCard';

import MainLayout from '../layouts/MainLayout';
import { useGetArticlesQuery } from '../__data__/services/articles';

interface IArticle {
    _id: string
    title: string
    content: string
    createdDate: string,
    modifiedData: string,
    user: [{
        login: string
        name: string
        role: string
        about: string
    }]
}

const ArticlesPage = () => {
    const { data, error, isLoading } = useGetArticlesQuery({});

    return (
        <MainLayout>
            <h1 className="text-3xl text-center mb-5 mt-5">Articles</h1>
            {isLoading && (
                <p className="w-1/2 mx-auto text-center">Загрузка постов...</p>
            )}
            {error && (
                <p className="bg-rose-500 text-white w-1/2 mx-auto p-4 rounded-md text-center">Ошибка загрузки данных</p>
            )}
            {data && (
                <section className="flex mb-3">
                    {data.articles.map((article: IArticle) => (
                        <ArticleCard key={article._id} {...article} />
                    ))}
                </section>
            )}
        </MainLayout>
    );
};

export default ArticlesPage;
