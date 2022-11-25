import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SiginForm from '../components/SiginForm';
import SiginLayout from '../layouts/SiginLayout';
import { accessToken } from '../__data__/slices/app';

const SiginPage: FC = () => {
    const token = useSelector(accessToken);
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
