import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownReact from '../components/MarkdownReact';

import MainLayout from '../layouts/MainLayout';
import { useGetArticleQuery } from '../__data__/services/articles';
import { accessToken } from '../__data__/slices/app';

const ArticlePage: FC = () => {
    const token = useSelector(accessToken);
    const navigate = useNavigate();
    const params = useParams();
    const { data, error, isLoading } = useGetArticleQuery(params.id);
    console.log(data);
    useEffect(() => {
        if (!token) {
            navigate('/admin/sigin');
        }
    }, [navigate, token]);

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
                    <h1 className="text-5xl text-center mb-5 mt-5">{data.article.header}</h1>
                    <p className="text-slate-500 text-lg">{data.article.fullDescription}</p>
                    <MarkdownReact>{data.article.mdContent}</MarkdownReact>
                </section>
            )}
        </MainLayout>
    );
};

export default ArticlePage;
