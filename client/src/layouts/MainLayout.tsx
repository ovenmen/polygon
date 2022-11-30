import React, { FC, ReactNode } from 'react';
import Navigation from '../components/Navigation';

interface IProps {
    children: ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => (
    <div className="flex">
        <aside>
            <Navigation />
        </aside>
        <section className="w-full ml-[200px] p-5 container m-auto">
            {children}
        </section>
    </div>
);

export default MainLayout;
