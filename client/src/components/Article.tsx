import type { FC } from 'react';
import React, { useCallback, useRef } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { createReactEditorJS } from 'react-editor-js';

import { fetcher } from 'src/utils/fetcher';
import { TOOLS } from 'src/utils/editor';
import Aside from './Aside';

interface IProps {
    id: string
}

const ReactEditorJS = createReactEditorJS();

const Article: FC<IProps> = ({
    id
}) => {
    const editorCore = useRef(null);
    const { data, error, isLoading } = useSWR(`http://localhost:5000/api/articles/${id}`, fetcher.get);
    const { trigger, isMutating } = useSWRMutation('http://localhost:5000/api/articles', fetcher.change);

    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance;
    }, []);

    const handleSave = useCallback(async () => {
        const savedData = await editorCore.current.save();
        await trigger({ id, content: savedData.blocks});
    }, [id, trigger]);

    if (isLoading) {
        return (
            <div className="text-lg text-center">Loading...</div>
        );
    }

    if (error) {
        return (
            <p className="text-lg text-center font-bold text-white bg-rose-500 mb-5 rounded-md p-2 w-96 mx-auto">
                Ошибка запроса
            </p>
        );
    }

    const {
        content,
        modifiedDate,
        createdDate,
        user
    } = data.article;
    const author = user.at(0);
    const header = content.find(item => item.type === 'header')?.data.text;

    return (
        <div className="grid grid-cols-[1fr_300px] h-[calc(100vh-52px)]">
            <article className="m-5 prose prose-md prose-slate w-full mx-auto">
                {header && (
                    <h1 className="text-3xl text-center my-5">{header}</h1>
                )}
                <ReactEditorJS
                    onInitialize={handleInitialize}
                    tools={TOOLS}
                    defaultValue={{blocks: content}}
                />
            </article>
            <Aside
                title="Edit article"
                user={author}
                modifiedDate={modifiedDate}
                createdDate={createdDate}
                onSave={handleSave}
                isMutation={isMutating}
            />
        </div>
    );
};

export default Article;
