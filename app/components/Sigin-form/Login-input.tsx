import React, { FC } from 'react';
import { useField } from 'formik';

type Props = {
    name: string,
    label: string,
    type: string,
    autoComplete?: string,
    placeholder?: string
}

const LoginInput: FC<Props> = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { name } = props as Props;

    return (
        <div className="mb-3">
            <label htmlFor={name} className="sr-only">{label}</label>
            <input className="block border border-gray-600 w-full p-2 rounded outline-none focus:border-cyan-600 invalid:active:border-rose-500" {...field} {...props} />
            {meta.touched && meta.error && (
                <div className="text-rose-500">{meta.error}</div>
            )}
        </div>
    );
};

export default LoginInput;
