import React from 'react';

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

const ArticleCard = ({ title, content,  }: IArticle) =>  (
    <div className="article rounded-md basis-1/5 mx-4 p-3 border-2">
        <p className="text-2xl mb-3">{title}</p>
        <MarkdownReact>{content}</MarkdownReact>
    </div>
);

export default ArticleCard;
