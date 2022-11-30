import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import TinyEditor from '../components/TinyEditor';
import MainLayout from '../layouts/MainLayout';
import { useGetArticleQuery } from '../__data__/services/articles';

const EditorPage: FC = () => {
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
                    <h1 className="text-4xl m-auto text-center mb-7">Edit article</h1>
                    <TinyEditor {...data.article} />
                </section>
            )}
        </MainLayout>
    );
};

export default EditorPage;
