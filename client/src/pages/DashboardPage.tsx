import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import { RootState } from '../__data__/store';

const DashboardPage = () => {
    const token = useSelector<RootState>((state) => state.app.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/admin/sigin');
        }
    }, [navigate, token]);

    return (
        <DashboardLayout>
            <h1>Dashboard</h1>
        </DashboardLayout>
    );
};

export default DashboardPage;
