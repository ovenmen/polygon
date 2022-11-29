import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { decodeToken } from 'react-jwt';

import MainLayout from '../layouts/MainLayout';
import { accessToken } from '../__data__/slices/app';
import { useGetUserQuery } from '../__data__/services/users';

interface IToken {
    id: string
    login: string
}

interface IUser {
    login: string
    name: string
    avatar: string
    role: string
    about: string
}

interface IHookData {
    isLoading: boolean,
    data: {
        count: number
        user: IUser
    }
    error?: {
        data: {
            error: string
        }
    }
}

const ProfilePage: FC = () => {
    const token = useSelector(accessToken);
    const user = decodeToken(token) as IToken;
    const { id } = user;
    const { data, isLoading, error } = useGetUserQuery<IHookData>(id);

    return (
        <MainLayout>
            <section className="container mx-auto">
                {isLoading && <p>Загрузка профиля...</p>}
                {error && <p className="bg-rose-500 text-white w-1/2 mx-auto p-4 rounded-md text-center">{error?.data?.error || 'Не удалось получить информацию о профиле'}</p>}
                {data && (
                    <div className="flex">
                        <div className="mr-5">
                            <figure>
                                <img src={data.user.avatar} alt="Avatar" className=" w-[200px] mb-5 rounded-md" />
                            </figure>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold text-gray-700">Login: </span>
                                {data.user.login}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Username: </span>
                                {data.user.name}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Role: </span>
                                {data.user.role}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">About: </span>
                                {data.user.about}
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </MainLayout>
    );
};

export default ProfilePage;
