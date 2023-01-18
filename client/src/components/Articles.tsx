import type { FC } from 'react';
import React from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { fetcher } from 'src/utils/fetcher';
import { formatDate } from 'src/utils/dates';
import ButtonAdd from './ButtonAdd';

const Articles: FC = () => {
    const { data, error, isLoading } = useSWR('http://localhost:5000/api/articles', fetcher.get);
    const { trigger } = useSWRMutation('http://localhost:5000/api/articles', fetcher.delete);

    const handleClickRemoveArticle = async (e) => {
        try {
            const { id } = e.target.dataset;
            trigger({ id });
        } catch (error) {
            throw new Error(error);
        }
    };

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

    if (!data.articles) {
        return (
            <>
                <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2 w-96 mx-auto">
                    Нет статей
                </p>
                <footer className="absolute bottom-5 right-5">
                    <ButtonAdd url="/admin/articles/create" />
                </footer>
            </>
        );
    }

    return (
        <section className="px-5 mx-auto">
            <table className="border-collapse border border-slate-300 w-[100%]">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="border border-slate-300 p-3 text-center">
                            №
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Id
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Header
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Category
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Creator
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Created date
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Modified date
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Operations
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.articles.map((article, index) => {
                        const { _id, category, user, createdDate, modifiedDate } = article;
                        const author = user.at(0);
                        const { name } = author;

                        return (
                            <tr key={_id} data-id={_id}>
                                <td className="border border-slate-300 p-3 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    <a href={`/admin/articles/${_id}`} className="text-blue-500 hover:underline">
                                        {_id}
                                    </a>
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {category}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {name}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {createdDate && formatDate.toLocalDate(createdDate)}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {modifiedDate && formatDate.toLocalDate(modifiedDate)}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    <button onClick={handleClickRemoveArticle}>
                                        <i className="fa-solid fa-trash text-red-600" data-id={_id}></i> 
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <footer className="absolute bottom-5 right-5">
                <ButtonAdd url="/admin/articles/create" />
            </footer>
        </section>
    );
};

export default Articles;