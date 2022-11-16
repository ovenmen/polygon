import React from 'react';
import {
    Route,
    BrowserRouter,
    Routes,
  } from "react-router-dom";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1>Home</h1>} />
            <Route path='/dashboard' element={<h1>Dashboard</h1>} />
        </Routes>
    </BrowserRouter>
);

export default App;
