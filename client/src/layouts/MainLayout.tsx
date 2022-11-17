import React, { FC, ReactNode } from 'react';
import Navigation from '../components/Navigation';

interface IProps {
    children: ReactNode
}

const DashboardLayout: FC<IProps> = ({ children }) => (
    <div className="flex">
        <section className="basis-1/6">
            <Navigation />
        </section>
        <section className="w-full mx-3">
            {children}
        </section>
    </div>
);

export default DashboardLayout;
