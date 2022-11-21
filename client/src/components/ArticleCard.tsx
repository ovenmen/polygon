import React, { FC } from 'react';

import MarkdownReact from './MarkdownReact';

interface IArticle {
    _id: string
    title: string
    content: string
    createdDate: string,
    modifiedData: string,
    user: [
        {
            login: string
            name: string
            role: string
            about: string
        }
    ]
}

const ArticleCard: FC<IArticle> = ({ title, content }) =>  (
    <div className="article rounded-md mx-4 p-3 border-2 flex-wrap w-1/3">
        <p className="text-2xl mb-3">{title}</p>
        <MarkdownReact>{content}</MarkdownReact>
    </div>
);

export default ArticleCard;
