import React from 'react';
import { useSelector } from 'react-redux';
import { appName } from '../__data__/slices/app';

const Loader = () => {
    const title = useSelector(appName);

    return (
        <div className="flex justify-center items-center w-[vw] h-[100vh]">
            <p className="text-7xl">{title}</p>
        </div>
    );
};

export default Loader;
