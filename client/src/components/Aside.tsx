import type { FC } from 'react';
import React from 'react';

import { formatDate } from 'src/utils/dates';
import type { IUser } from 'src/utils/fetcher';
import FileLoader from './FileLoader';

interface IAside {
    title: string
    user?: IUser
    createdDate?: Date
    modifiedDate?: Date
    isMutating?: boolean
    form?: string
    operations?: string[],
    fileMetaInfo: string
}

const Aside: FC<IAside> = ({
    title,
    user,
    isMutating,
    createdDate,
    modifiedDate,
    form,
    operations,
    fileMetaInfo
}) => {
    return (
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
            {operations && (
                <div className="border-t border-b border-grey-500 pt-3 pb-3">
                    <h4 className="font-semibold mb-3">Operations:</h4>
                    {operations.includes('add') && (
                        <FileLoader form={form} />
                    )}
                    {operations.includes('save') && (
                        <button
                            className="block bg-green-500 hover:bg-green-600 transition ease-in-out duration-300 text-white w-full rounded-md p-2 mt-3"
                            type="submit"
                            form={form}
                        >
                            {isMutating ? 'Saving...' : 'Save'}
                        </button>
                    )}
                </div>
            )}
            {fileMetaInfo && (
                <div>
                    <h4 className="text-md font-semibold my-3">File meta info:</h4>
                    <p>
                        <span className="font-semibold">Filename: </span>
                        {fileMetaInfo.fileName}
                    </p><p>
                        <span className="font-semibold">Create date: </span>
                        {fileMetaInfo.createdDate && formatDate.toLocalDate(fileMetaInfo.createdDate)}
                    </p>
                </div>
            )}
        </aside>
    );
};


export default Aside;
