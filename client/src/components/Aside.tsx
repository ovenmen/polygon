import type { FC} from 'react';
import React from 'react';

import { formatDate } from 'src/utils/dates';
import type { IUser } from 'src/utils/fetcher';

interface IAside {
    title: string
    user?: IUser
    createdDate?: Date
    modifiedDate?: Date
    isMutation?: boolean,
    form?: string
}

const Aside: FC<IAside> = ({
    title,
    user,
    isMutation,
    createdDate,
    modifiedDate,
    form
}) => (
    <aside className="bg-gray-50 p-5">
        <h3 className="text-center text-lg font-semibold mb-5">{title}</h3>
        {user && (
            <div className="border-t border-b border-grey-500 pt-3 pb-3">
                <figure className="flex">
                    {user.avatar && (
                        <img src={user.avatar} alt="avatar" className="w-14 h-14 rounded-full mr-5" />
                    )}
                    <figcaption>
                        {user.login && (
                            <p className="font-semibold">{user.login}</p>
                        )}
                        {user.name && (
                            <p>{user.name}</p>
                        )}
                    </figcaption>
                </figure>
            </div>
        )}
        {(createdDate || modifiedDate) && (
            <div>
                {createdDate && (
                    <p className="mt-5 mb-5">
                        <span className="font-semibold">createdDate: </span>
                        {formatDate.toFullLocalDate(createdDate)}
                    </p>
                )}
                {modifiedDate && (
                    <p className="mt-5 mb-5">
                        <span className="font-semibold">modifiedDate: </span>
                        {formatDate.toFullLocalDate(modifiedDate)}
                    </p>
                )}
            </div>
        )}
        {form && (
            <div className="border-t border-b border-grey-500 pt-3 pb-3">
                <h4 className="font-semibold mb-3">Operations:</h4>
                <button className="block bg-green-500 text-white w-full rounded-md p-2" type="submit" form={form}>
                    {isMutation ? 'Saving...' : 'Save'}
                </button>
            </div>
        )}
    </aside>
);


export default Aside;
