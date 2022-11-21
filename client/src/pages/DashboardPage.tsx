import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import { accessToken } from '../__data__/slices/app';

const DashboardPage: FC = () => {
    const token = useSelector(accessToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/admin/sigin');
        }
    }, [navigate, token]);

    return (
        <MainLayout>
            <h1 className="text-3xl text-center mb-5 mt-5">Dashboard</h1>
            <section className="columns-3 mb-3">
                <div className="h-96 bg-slate-300 rounded-md">1</div>
                <div className="h-96 bg-slate-300 rounded-md">2</div>
                <div className="h-96 bg-slate-300 rounded-md">3</div>
            </section>
            <section className="columns-5">
                <div className="h-96 bg-slate-300 rounded-md">1</div>
                <div className="h-96 bg-slate-300 rounded-md">2</div>
                <div className="h-96 bg-slate-300 rounded-md">3</div>
                <div className="h-96 bg-slate-300 rounded-md">4</div>
                <div className="h-96 bg-slate-300 rounded-md">5</div>
            </section>
        </MainLayout>
    );
};

export default DashboardPage;
