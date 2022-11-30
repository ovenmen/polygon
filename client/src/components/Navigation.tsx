import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../__data__/slices/app';

const Navigation: FC = () => {
    const dispatch = useDispatch();

    return (
        <nav className="bg-sky-700 m-0 p-0 w-[200px] fixed top-0 bottom-0 left-0">
            <ul>
                <li className="text-slate-100 bg-sky-500 font-bold p-5">Polygon CMS</li>
                <li className="text-white hover:bg-sky-800 px-5 py-2"><Link to="/admin/dashboard">dashboard</Link></li>
                <li className="text-white hover:bg-sky-800 px-5 py-2"><Link to="/admin/articles">articles</Link></li>
                <li className="text-white hover:bg-sky-800 px-5 py-2"><Link to="/admin/profile">profile</Link></li>
                <li className="text-white hover:bg-sky-800 px-5 py-2"><Link onClick={() => dispatch(logout())} to="/admin/logout">logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
