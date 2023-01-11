import type { FC} from 'react';
import React, { useEffect, useState } from 'react';
import type { IArticle } from 'src/utils/fetcher';
import { fetcher } from 'src/utils/fetcher';

interface IArticles {
    articles: IArticle[]
}

const Articles: FC = () => {
    const [data, setData] = useState<IArticles>(null);

    useEffect(() => {
        fetcher
            .get('http://localhost:5000/api/articles')
            .then((data) => setData(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            {data && data.articles.map((article) => (
                <section key={article._id} className="border mb-3 p-3">
                    <p>Категория: {article.category}</p>
                    <div className="flex">
                        <span>Автор: </span>
                        <img src={article.user.at(0).avatar} alt="avatar" className="w-14 rounded-full" />
                        <span>{article.user.at(0).name}</span>
                    </div>
                    <h3 className="text-2xl">{article.header}</h3>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} className="text-justify" />
                </section>
            ))}
        </div>
    );
};

export default Articles;
