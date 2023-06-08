import type { FC } from 'react';
import React from 'react';

import { formatDate } from 'src/utils/dates';
import type { IFileMetaData, IUser } from 'src/utils/interfaces';
import RemoveButton from './buttons/remove-button';
import SubmitButton from './buttons/submit-button';
import FileLoader from './file-loader';

interface IProps {
    title: string
    user?: IUser
    createdDate?: Date
    modifiedDate?: Date
    isMutating?: boolean
    form?: string
    operations?: string[],
    fileMetaData?: IFileMetaData,
    onClickRemoveFile?: (arg: string) => void
}

const Aside: FC<IProps> = ({
    title,
    user,
    isMutating,
    createdDate,
    modifiedDate,
    form,
    operations,
    fileMetaData,
    onClickRemoveFile
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
                        <SubmitButton
                            form={form}
                            isMutating={isMutating}
                        />
                    )}
                </div>
            )}
            {fileMetaData && (
                <div>
                    <h4 className="text-md font-semibold my-3">File meta info:</h4>
                    {fileMetaData && (
                        <p className="mb-1">
                            <span className="font-semibold">Filename: </span>
                            {fileMetaData.fileName}
                        </p>
                    )}
                    {fileMetaData.createdDate && (
                        <p className="mb-1">
                            <span className="font-semibold">Create date: </span>
                            {formatDate.toShortLocalDate(fileMetaData.createdDate)}
                        </p>
                    )}
                    {fileMetaData.url && (
                        <div>
                            <p className="mb-1">
                                <span className="font-semibold">Url: </span>
                                {fileMetaData.url}
                            </p>
                            <RemoveButton
                                isMutating={isMutating}
                                onClick={() => onClickRemoveFile(fileMetaData._id)}
                            />
                        </div>
                        
                    )}
                </div>
            )}
        </aside>
    );
};


export default Aside;
