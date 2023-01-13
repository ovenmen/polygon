import type { FC} from 'react';
import React from 'react';
import useFetchUsers from 'src/hooks/useFetchUsers';
import { formatDate } from 'src/utils/dates';

const Users: FC = () => {
    const { isLoading, messageError, fetchError, data, remove } = useFetchUsers();

    const handleClickRemoveArticle = (e) => {
        const { id } = e.target.dataset;
        remove(id);
    };

    if (isLoading) {
        return (
            <div className="text-lg text-center">Loading...</div>
        );
    }

    if (fetchError) {
        return (
            <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2 w-96 mx-auto">
                Ошибка запроса
            </p>
        );
    }

    return (
        <div>
            {messageError && (
                <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2">
                    {messageError}
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
                            <tr key={_id}>
                                <td className="border border-slate-300 p-3 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-300 p-3 text-center">
                                    {_id}
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
        </div>
    );
};

export default Users;
