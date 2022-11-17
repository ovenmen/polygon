import React from 'react';
import {
    Route,
    BrowserRouter,
    Routes,
    Navigate,
} from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import SiginPage from './pages/SiginPage';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path='/admin/dashboard' element={<DashboardPage />} />
            <Route path='/admin/articles' element={<h1>Articles</h1>} />
            <Route path='/admin/sigin' element={<SiginPage />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </BrowserRouter>
);

export default App;
