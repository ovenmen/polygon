import type { FC } from 'react';
import React from 'react';

interface IProps {
    isMutating: boolean
    onClick: () => void
}

const RemoveButton: FC<IProps> = ({
    isMutating,
    onClick
}) => (
    <button
        className="block bg-rose-500 hover:bg-rose-600 transition ease-in-out duration-300 text-white w-full rounded-md p-2 mt-3"
        onClick={onClick}
    >
        {isMutating ? 'Removing...' : 'Remove'}
    </button>
);

export default RemoveButton;
