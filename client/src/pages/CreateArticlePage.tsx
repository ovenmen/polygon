import React, { FC } from 'react';

import TinyEditor from '../components/TinyEditor';
import MainLayout from '../layouts/MainLayout';

const CreateArticlePage: FC = () => {
    return (
        <MainLayout>
            <h1 className="text-4xl m-auto text-center mb-7">Create article</h1>
            <TinyEditor />
        </MainLayout>
    );
};

export default CreateArticlePage;
