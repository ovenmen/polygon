import React, { FC } from 'react';
import {
    Route,
    BrowserRouter,
    Routes,
    Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { accessToken } from './__data__/slices/app';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/Profile';
import SiginPage from './pages/SiginPage';
import NotFound from './pages/NotFound';
import EditorPage from './pages/EditorPage';
import CreateArticlePage from './pages/CreateArticlePage';

const App: FC = () => {
    const token = useSelector(accessToken);

    if (token) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path='/admin/dashboard' element={<DashboardPage />} />
                    <Route path='/admin/articles' element={<ArticlesPage />} />
                    <Route path='/admin/articles/create' element={<CreateArticlePage />} />
                    <Route path='/admin/articles/:id' element={<ArticlePage />} />
                    <Route path='/admin/articles/edit/:id' element={<EditorPage />} />
                    <Route path='/admin/sigin' element={<SiginPage />} />
                    <Route path='/admin/logout' element={<Navigate to="/admin/sigin" replace />} />
                    <Route path='/admin/profile' element={<ProfilePage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/sigin" replace />} />
                <Route path="/admin" element={<Navigate to="/admin/sigin" replace />} />
                <Route path='/admin/sigin' element={<SiginPage />} />
                <Route path='/admin/logout' element={<Navigate to="/admin/sigin" replace />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
