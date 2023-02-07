import type { FC } from 'react';
import React from 'react';

interface IProps {
    form: string
    isMutating: boolean
}

const SubmitSiginButton: FC<IProps> = ({
    form,
    isMutating
}) => (
    <button
        type="submit"
        className="block bg-yellow-500 text-white uppercase w-full rounded-md p-2"
        form={form}
    >
        {isMutating ? 'Отправка данных...' : 'Войти'}
    </button>
);

export default SubmitSiginButton;
