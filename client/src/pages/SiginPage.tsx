import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SiginForm from '../components/SiginForm';
import SiginLayout from '../layouts/SiginLayout';
import { RootState } from '../__data__/store';

const SiginPage: FC = () => {
    const token = useSelector<RootState>((state) => state.app.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/admin');
        }
    }, [navigate, token]);

    return (
        <SiginLayout>
            <SiginForm />
        </SiginLayout>
    );
};

export default SiginPage;
