import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {

    return (
        <nav className='flex bg-cyan-500'>
            <ul className='flex m-2'>
                <li className='m-1'><Link to="/admin/dashboard">dashboard</Link></li>
                <li className='m-1'><Link to="/admin/articles">articles</Link></li>
                <li className='m-1'><Link to="/admin/profile">profile</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
