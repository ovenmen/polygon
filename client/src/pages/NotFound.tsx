import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ErrorLayout from '../layouts/ErrorLayout';

const NotFound: FC = () => (
    <ErrorLayout>
        <h1 className="text-6xl">404 | Страница не найдена</h1>
        <p className="mt-10 text-cyan-500 text-2xl">
            <Link to="/admin/">Назад</Link>
        </p>
    </ErrorLayout>
);

export default NotFound;
