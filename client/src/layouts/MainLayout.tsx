import React, { FC, ReactNode } from 'react';
import Navigation from '../components/Navigation';

interface IProps {
    children: ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => (
    <div className="flex">
        <section className="basis-[200px]">
            <Navigation />
        </section>
        <section className="w-full mx-5">
            {children}
        </section>
    </div>
);

export default MainLayout;
