import React, { FC, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

interface IProps {
    content: string
}

const TinyEditor: FC<IProps> = ({
    content
}) => {
    const editorRef = useRef<TinyMCEEditor|null>(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <section className="mt-3 container">
            <h1 className="text-4xl m-auto text-center mb-7">Edit Article</h1>
            <Editor
                apiKey='bs3eviezorm408f69ic0479cqraai9m7p780ngtt8nlgfqqj'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={content}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </section>
    );
};

export default TinyEditor;
