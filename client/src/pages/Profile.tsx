import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

import MainLayout from '../layouts/MainLayout';
import { accessToken } from '../__data__/slices/app';
import { useGetUserQuery } from '../__data__/services/users';

interface IToken {
    id: string
    login: string
}

interface IUser {
    login?: string,
    name?: string
    role?: string,
    about?: string,
    createdDate?: string,
    modifiedDate?: string
}

const ProfilePage: FC = () => {
    const token = useSelector(accessToken);
    const navigate = useNavigate();
    const user = decodeToken(token) as IToken;
    const { id } = user;
    const { data, isLoading, error } = useGetUserQuery(id);
    const { login = '', name = '', role = '', about = '' } = data.user as IUser;

    useEffect(() => {
        if (!token) {
            navigate('/admin/sigin');
        }
    }, [navigate, token]);

    return (
        <MainLayout>
            <section className="container mx-5">
                <p>{login}</p>
                <p>{name}</p>
                <p>{role}</p>
                <p>{about}</p>
            </section>
        </MainLayout>
    );
};

export default ProfilePage;
