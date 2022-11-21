import React, { FC, ReactNode } from 'react';
import Navigation from '../components/Navigation';

interface IProps {
    children: ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => (
    <div className="flex">
        <aside className="ml-[200px]">
            <Navigation />
        </aside>
        <section className="w-full">
            {children}
        </section>
    </div>
);

export default MainLayout;
