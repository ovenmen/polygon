import type { FC } from 'react';
import React from 'react';

import { formatDate } from 'src/utils/dates';
import type { IUser } from 'src/utils/fetcher';

interface IAside {
    title: string
    user?: IUser
    createdDate?: Date
    modifiedDate?: Date
    isMutation: boolean
    onSave: () => void
}

const Aside: FC<IAside> = ({
    title,
    user,
    isMutation,
    onSave
}) => (
    <aside className="bg-gray-50 p-5">
        <h3 className="text-center text-lg mb-5">{title}</h3>
        {user && (
            <figure className="flex mb-5 mt-5">
                {user.avatar && (
                    <img src={user.avatar} alt="avatar" className="w-14 h-14 rounded-full mr-2" />
                )}
                <figcaption>
                    {user.login && (
                        <p>{user.login}</p>
                    )}
                    {user.name && (
                        <p>{user.name}</p>
                    )}
                </figcaption>
            </figure>
        )}
        {user?.createdDate && (
            <p className="mb-5">createdDate: {formatDate.toLocalDate(user.createdDate)}</p>
        )}
        {user?.modifiedDate && (
            <p className="mb-5">modifiedDate: {formatDate.toLocalDate(user.modifiedDate)}</p>
        )}
        <button className="block bg-green-500 text-white w-full rounded-md p-2" onClick={onSave}>
            {isMutation ? 'Saving...' : 'Save'}
        </button>
    </aside>
);


export default Aside;
