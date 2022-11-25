import React, { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode
}

const ErrorLayout: FC<IProps> = ({ children }) => (
    <div className="flex justify-center items-center flex-col w-[vw] h-[100vh]">
        {children}
    </div>
);

export default ErrorLayout;
