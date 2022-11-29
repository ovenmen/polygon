import React, { FC } from 'react';
import ArticleCard from '../components/ArticleCard';

import MainLayout from '../layouts/MainLayout';
import { useGetArticlesQuery } from '../__data__/services/articles';

interface IArticle {
    _id: string
    header: string
    shortDescription: string
    mdContent: string
    createdDate: string
    modifiedData: string
    user: [
        {
            login: string
            name: string
            role: string
            about: string
        }
    ]
}

interface IHookData {
    isLoading: boolean,
    data: {
        count: number
        articles: IArticle[]
    }
    error?: {
        data: {
            error: string
        }
    }
}

const ArticlesPage: FC = () => {
    const { data, error, isLoading } = useGetArticlesQuery<IHookData>({});

    return (
        <MainLayout>
            {isLoading && (
                <p className="w-1/2 mx-auto text-center">Загрузка постов...</p>
            )}
            {error && (
                <p className="bg-rose-500 text-white w-1/2 mx-auto p-4 rounded-md text-center">{error?.data?.error || 'Ошибка загрузки данных'}</p>
            )}
            {data && (
                <section className="container">
                    <h1 className="text-3xl text-center mb-5 mt-5">Articles ({data.count})</h1>
                    <div className="flex mb-3 flex-wrap">
                        {data.articles.map((article: IArticle) => (
                            <ArticleCard key={article._id} {...article} />
                        ))}
                    </div>
                </section>
            )}
        </MainLayout>
    );
};

export default ArticlesPage;
