import React, { useEffect } from 'react';

import DashboardLayout from '../layouts/MainLayout';

interface IParams {
    method: string
}

const getData = async (url: string, params: IParams) => {
    try {
        const response = await fetch(url, {
            ...params,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    } catch (error) {
        // throw new Error(error.message);
    }
};


const ArticlesPage = () => {
    useEffect(() => {
        getData('http://localhost:5000/posts', { method: 'GET' })
            .then((articles) => {
                console.log(articles);
            });
    }, []);

    return (
        <DashboardLayout>
            <h1 className="text-3xl text-center mb-5 mt-5">Articles</h1>
            <section className="columns-3 mb-3">
                <div className="h-96 bg-slate-300 rounded-md">1</div>
                <div className="h-96 bg-slate-300 rounded-md">2</div>
                <div className="h-96 bg-slate-300 rounded-md">3</div>
            </section>
        </DashboardLayout>
    );
};

export default ArticlesPage;
