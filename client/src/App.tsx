import React, { FC } from 'react';
import {
    Route,
    BrowserRouter,
    Routes,
    Navigate
} from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';

import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/Profile';
import SiginPage from './pages/SiginPage';

const App: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path='/admin/dashboard' element={<DashboardPage />} />
            <Route path='/admin/articles' element={<ArticlesPage />} />
            <Route path='/admin/sigin' element={<SiginPage />} />
            <Route path='/admin/profile' element={<ProfilePage />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </BrowserRouter>
);

export default App;
