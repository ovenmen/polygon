import type { FC } from 'react';
import React, { useRef, useCallback } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import useSWRMutation from 'swr/mutation';

import { TOOLS } from 'src/utils/editor';
import { fetcher } from 'src/utils/fetcher';
import Aside from './Aside';

const ReactEditorJS = createReactEditorJS();

const CreateArticle: FC = () => {
    const editorCore = useRef(null);
    const { trigger, isMutating } = useSWRMutation('http://localhost:5000/api/articles', fetcher.post);

    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance;
    }, []);

    const handleSave = useCallback(async () => {
        const savedData = await editorCore.current.save();
        await trigger({content: savedData.blocks});
        console.log(savedData);
    }, []);

    return (
        <div className="grid grid-cols-[minmax(600px,_1fr)_300px] h-[calc(100vh-52px)]">
            <article className="m-5 prose prose-md prose-slate w-full mx-auto">
                <h1 className="text-3xl text-center my-5">Create article</h1>
                <ReactEditorJS
                    onInitialize={handleInitialize}
                    tools={TOOLS}
                />
            </article>
            <Aside
                title="Create article"
                onSave={handleSave}
                isMutation={isMutating}
            />
        </div>
    );
};

export default CreateArticle;
