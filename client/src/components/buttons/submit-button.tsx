import type { FC } from 'react';
import React from 'react';

interface IProps {
    form: string
    isMutating: boolean
}

const SubmitButton: FC<IProps> = ({
    form,
    isMutating
}) => (
    <button
        className="block bg-green-500 hover:bg-green-600 transition ease-in-out duration-300 text-white w-full rounded-md p-2 mt-3"
        type="submit"
        form={form}
    >
        {isMutating ? 'Saving...' : 'Save'}
    </button>
);

export default SubmitButton;
