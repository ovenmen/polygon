import React, { FC, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useCreateArticleMutation, useUpdateArticleMutation } from '../__data__/services/articles';

interface IFormInputs {
    header: string
    shortDescription: string
    fullDescription: string
    content: string
    category: string
    tags: string[]
}

interface IArticle {
    _id?: string
    header?: string
    shortDescription?: string
    fullDescription?: string
    content?: string
    category?: string
    tags?: string[]
    createdDate?: string
    modifiedData?: string
    user?: [
        {
            login: string
            name: string
            role: string
            about: string
        }
    ]
}

interface IHookData {
    isLoading: boolean,
    data: {
        count: number
        article: IArticle
    }
    error?: {
        data: {
            error: string
        }
    }
}

const validationSchema = Yup.object({
    header: Yup
        .string()
        .min(3, 'Логин слишком короткий')
        .required('Заголовок обязателен'),
    shortDescription: Yup
        .string(),
    fullDescription: Yup
        .string(),
    category: Yup
        .string()
});

const TinyEditor: FC<IArticle> = (props) => {
    const editorRef = useRef<TinyMCEEditor|null>(null);
    const [createArticle, { isLoading, error }] = useCreateArticleMutation<IHookData>();
    const [updateArticle] = useUpdateArticleMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: props ? {
            header: props.header,
            shortDescription: props.shortDescription,
            fullDescription: props.fullDescription,
            content: props.content,
            category: props.category,
            tags: props.tags
        } : {
            header: '',
            shortDescription: '',
            fullDescription: '',
            content: '',
            category: '',
            tags: []
        },
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (formProps: IFormInputs) => {
        try {
            if (editorRef.current) {
                const articleContent = editorRef.current.getContent();

                if (props.content) {
                    await updateArticle({ id: props._id, formData: { ...formProps, content: articleContent } });
                } else {
                    await createArticle({...formProps, content: articleContent});
                }
            }
        } catch (error) {
            
        }
    };

    return (
        <section className="mt-3 container">
            {isLoading && (
                <p className="w-1/2 mx-auto text-center p-4">Загрузка редактора...</p>
            )}
            {error && (
                <p className="bg-rose-500 text-white w-1/2 mx-auto p-4 rounded-md text-center">
                    {error?.data?.error || 'Ошибка создания статьи'}
                </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="header" className="mr-3 font-semibold">Заголовок:</label>
                    <input type="text" className="block border border-gray-600 w-full p-2 rounded outline-none focus:border-cyan-600 focus:ring-2" placeholder="Заголовок" autoComplete="header" {...register('header')} />
                    {errors.header && <p className="text-rose-500">{errors.header.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="shortDescription" className="mr-3 font-semibold">Краткое описание:</label>
                    <textarea className="block border border-gray-600 w-full p-2 rounded outline-none focus:border-cyan-600 focus:ring-2" placeholder="Краткое описание" {...register('shortDescription')} rows={2}></textarea>
                    {errors.shortDescription && <p className="text-rose-500">{errors.shortDescription.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="fullDescription" className="mr-3 font-semibold">Полное описание:</label>
                    <textarea className="block border border-gray-600 w-full p-2 rounded outline-none focus:border-cyan-600 focus:ring-2" placeholder="Полное описание" {...register('fullDescription')} rows={4}></textarea>
                    {errors.fullDescription && <p className="text-rose-500">{errors.fullDescription.message}</p>}
                </div>
                <div>
                    <label htmlFor="content" className="mr-3 font-semibold">Содержимое:</label>
                    <Editor
                        apiKey='bs3eviezorm408f69ic0479cqraai9m7p780ngtt8nlgfqqj'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={props.content}
                        textareaName="content"
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
                </div>
                <button type="submit" className="bg-sky-600 rounded p-2 text-white mt-5 disabled:bg-sky-200 focus:ring-2 text-right">
                    {isLoading ? 'Отправка данных...' : 'Sign in'}
                </button>
            </form>
        </section>
    );
};

export default TinyEditor;
