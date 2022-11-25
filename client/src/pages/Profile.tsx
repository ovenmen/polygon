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

const ProfilePage: FC = () => {
    const token = useSelector(accessToken);
    const user = decodeToken(token) as IToken;
    const { id } = user;
    const { data, isLoading, error } = useGetUserQuery(id);

    return (
        <MainLayout>
            <section className="container mx-5">
                {isLoading && <p>Загрузка профиля...</p>}
                {error && <p>Не удалось информацию о профиле</p>}
                {data && (
                    <div>
                        <p>{data.user.login}</p>
                        <p>{data.user.name}</p>
                        <p>{data.user.role}</p>
                        <p>{data.user.about}</p>
                    </div>
                )}
            </section>
        </MainLayout>
    );
};

export default ProfilePage;
