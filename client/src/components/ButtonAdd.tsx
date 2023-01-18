import type { FC } from 'react';
import React from 'react';

interface IButton {
    url: string
}

const ButtonAdd: FC<IButton> = ({
    url
}) => (
    <a href={url} className="block bg-green-600 rounded-full hover:origin-center hover:rotate-180 hover:bg-green-500 transition duration-300 ease-in-out">
        <i className="fa-regular fa-plus text-white text-lg px-[21px] py-[20px]"></i>
    </a>
);

export default ButtonAdd;
