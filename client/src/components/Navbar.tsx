import type { FC } from 'react';
import React from 'react';
import type { IUser } from 'src/utils/fetcher';

interface INavbar {
    user: IUser
    pathname: string
}

const Navbar: FC<INavbar> = ({
    user,
    pathname
}) => (
    <nav className="bg-sky-700">
        <ul className="flex">
            <li className={`py-3 px-4 ${pathname === '/admin' && 'bg-sky-600'} hover:bg-sky-600 transition duration-300 ease-out`}>
                <a href="/admin" className="text-white block">
                    Dashboard
                </a>
            </li>
            <li className={`py-3 px-4 ${pathname === '/admin/articles' && 'bg-sky-600'} hover:bg-sky-600 transition duration-300 ease-out`}>
                <a href="/admin/articles" className="text-white block">
                    Articles
                </a>
            </li>
            <li className={`py-3 px-4 ${pathname === '/admin/users' && 'bg-sky-600'} hover:bg-sky-600 transition duration-300 ease-out`}>
                <a href="/admin/users" className="text-white block">
                    Users
                </a>
            </li>
            <li className={`py-3 px-4 ${pathname === '/admin/media' && 'bg-sky-600'} hover:bg-sky-600 transition duration-300 ease-out`}>
                <a href="/admin/media" className="text-white block">
                    Media
                </a>
            </li>
            <li className="relative py-3 px-4 flex ml-auto group/item">
                {user.avatar && (
                    <img src={user.avatar} alt="avatar" className="w-7 h-7 rounded-2xl mr-2" />
                )}
                <button className="text-white">
                    {user.name}
                    <ul className="absolute left-0 top-[52px] w-[100%] bg-sky-700 text-left invisible opacity-0 group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 ease-in-out">
                        <li className={`py-3 px-4 ${pathname === '/admin/profile' && 'bg-sky-600'} hover:bg-sky-600 transition duration-300 ease-out`}>
                            <a href="/admin/profile" className="text-white block">Profile</a>
                        </li>
                        <li className={`py-3 px-4 ${pathname === '/admin/logout' && 'bg-sky-600'} hover:bg-sky-600 transition duration-300 ease-out`}>
                            <a href="/admin/logout" className="text-white block">Logout</a>
                        </li>
                    </ul>
                </button>
            </li>
        </ul>
    </nav>
);

export default Navbar;
