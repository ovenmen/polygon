import React, { FC } from 'react'; 
import MarkdownIt from 'markdown-it';

interface IProps {
    children: string
}

const MarkdownReact: FC<IProps> = ({ children }) => {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true
    });

    return (
        <div dangerouslySetInnerHTML={{ __html: md.render(children)}} />
    );
};

export default MarkdownReact;
