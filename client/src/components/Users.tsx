import type { FC} from 'react';
import React, { useEffect, useState } from 'react';
import { formatDate } from 'src/utils/dates';
import type { IUser } from 'src/utils/fetcher';
import { fetcher } from 'src/utils/fetcher';

interface IUsers {
    users: IUser[]
}

const Users: FC = () => {
    const [data, setData] = useState<IUsers>(null);

    useEffect(() => {
        fetcher
            .get('http://localhost:5000/api/users')
            .then((data) => setData(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <table className="border-collapse border border-slate-300 w-[100%]">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="border border-slate-300 p-3 text-center">№</th>
                        <th className="border border-slate-300 p-3 text-center">Id</th>
                        <th className="border border-slate-300 p-3 text-center">Login</th>
                        <th className="border border-slate-300 p-3 text-center">Name</th>
                        <th className="border border-slate-300 p-3 text-center">Role</th>
                        <th className="border border-slate-300 p-3 text-center">Created date</th>
                        <th className="border border-slate-300 p-3 text-center">Modified date</th>
                        <th className="border border-slate-300 p-3 text-center">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.users.map((user, index) => {
                        const { _id, login, name, role, createdDate, modifiedDate } = user;

                        return (
                            <tr key={_id}>
                                <td className="border border-slate-300 p-3 text-center">{index + 1}</td>
                                <td className="border border-slate-300 p-3 text-center">{_id}</td>
                                <td className="border border-slate-300 p-3 text-center">{login}</td>
                                <td className="border border-slate-300 p-3 text-center">{name}</td>
                                <td className="border border-slate-300 p-3 text-center">{role}</td>
                                <td className="border border-slate-300 p-3 text-center">{createdDate && formatDate.toLocalDate(createdDate)}</td>
                                <td className="border border-slate-300 p-3 text-center">{modifiedDate && formatDate.toLocalDate(modifiedDate)}</td>
                                <td className="border border-slate-300 p-3 text-center"></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
