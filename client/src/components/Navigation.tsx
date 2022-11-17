import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {

    return (
        <nav className="bg-sky-700 m-0 p-0">
            <ul>
                <li className="text-slate-100 bg-sky-500 font-bold p-2">Polygon CMS</li>
                <li className="text-white hover:bg-sky-800 p-2"><Link to="/admin/dashboard">dashboard</Link></li>
                <li className="text-white hover:bg-sky-800 p-2"><Link to="/admin/articles">articles</Link></li>
                <li className="text-white hover:bg-sky-800 p-2"><Link to="/admin/profile">profile</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
