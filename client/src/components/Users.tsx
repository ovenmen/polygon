import type { FC } from 'react';
import React, { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { formatDate } from 'src/utils/dates';
import { fetcher } from 'src/utils/fetcher';
import ButtonAdd from './ButtonAdd';

const Users: FC = () => {
    const [errorMutation, setErrorMutation] = useState('');
    const { data, error, isLoading } = useSWR('http://localhost:5000/api/users', fetcher.get);
    const { trigger } = useSWRMutation('http://localhost:5000/api/users', fetcher.delete);

    const handleClickRemoveArticle = async (e) => {
        try {
            const { id } = e.target.dataset;
            const result = await trigger({ id });
            setErrorMutation(result.error);
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

    return (
        <section className="px-5 mx-auto">
            {errorMutation && (
                <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2">
                    {errorMutation}
                </p>
            )}
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
                            Login
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Name
                        </th>
                        <th className="border border-slate-300 p-3 text-center">
                            Roles
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
                    {data?.users.map((user, index) => {
                        const { _id, login, name, roles, createdDate, modifiedDate } = user;

                        return (
                            <tr key={_id} className={`${roles.includes('superAdmin') && "bg-rose-100"}`}>
                                <td className="border border-slate-300 p-3 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    <a href={`/admin/users/${_id}`} className="text-blue-500 hover:underline">
                                        {_id}
                                    </a>
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {login}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {name}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {roles.join(', ')}
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
                <ButtonAdd url="/admin/users/create" />
            </footer>
        </section>
    );
};

export default Users;
