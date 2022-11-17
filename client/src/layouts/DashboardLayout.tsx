import React, { FC, ReactNode } from 'react';
import Navigation from '../components/Navigation';

interface IProps {
    children: ReactNode
}

const DashboardLayout: FC<IProps> = ({ children }) => (
    <div>
        <section>
            <Navigation />
        </section>
        <section className="container mx-auto">
            {children}
        </section>
    </div>
);

export default DashboardLayout;
