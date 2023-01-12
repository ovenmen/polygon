import type { FC } from 'react';
import React, { useEffect, useState, useCallback } from 'react';
import { formatDate } from 'src/utils/dates';
import type { IArticle } from 'src/utils/fetcher';
import { fetcher } from 'src/utils/fetcher';

interface IArticles {
    articles: IArticle[]
}

const Articles: FC = () => {
    const [data, setData] = useState<IArticles>(null);

    useEffect(() => {
        fetcher
            .get('http://localhost:5000/api/articles')
            .then((data) => setData(data))
            .catch((error) => console.log(error));
    }, []);

    const handleClickRemoveArticle = useCallback((e) => {
        console.log(e.target);
        // console.log(e.target.parentNode.parentNode)
        // fetcher
        //     .delete('http://localhost:5000/api/articles', )
        //     .then((data) => setData(data))
        //     .catch((error) => console.log(error));
    }, []);

    return (
        <div>
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
                    {data && data.articles.map((article, index) => {
                        const { _id, header, category, user, createdDate, modifiedDate } = article;
                        const author = user.at(0);
                        const { name } = author;

                        return (
                            <tr key={_id} data-id={_id}>
                                <td className="border border-slate-300 p-3 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {_id}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {header}
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
                                    
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Articles;
