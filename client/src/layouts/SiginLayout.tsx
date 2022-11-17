import React, { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode
}

const SiginLayout: FC<IProps> = ({ children }) => (
    <div className="flex justify-center items-center w-[vw] h-[100vh] bg-gradient-to-r from-purple-500 to-pink-500">
        {children}
    </div>
);

export default SiginLayout;
