import { useCallback, useEffect, useState } from "react";
import { fetcher } from "src/utils/fetcher";

const useFetchArticles = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({
        success: false,
        count: 0,
        articles: []
    });
    const [messageError, setMessageError] = useState('');
    const [fetchError, setFetchError] = useState('');

    const getArticles = useCallback(() => {
        setLoading(fetcher.isLoading);

        fetcher
            .get('http://localhost:5000/api/articles')
            .then((response) => {
                setLoading(false);
                setFetchError(fetcher.fetchError);

                if (response.success) {
                    setData(response);
                } else {
                    setMessageError(fetcher.messageError);
                }
            });
    }, []);

    const deleteArticle = useCallback((id) => {
        setLoading(fetcher.isLoading);

        fetcher
            .delete(`http://localhost:5000/api/articles/${id}`)
            .then((response) => {
                setLoading(false);
                setFetchError(fetcher.fetchError);

                if (response.success) {
                    setData({
                        ...data,
                        articles: data.articles.filter(article => article._id !== id)
                    });
                } else {
                    setMessageError(fetcher.messageError);
                }
            });
    }, [data]);

    useEffect(() => {
        getArticles();
    }, [getArticles]);

    const remove = (id: string) => {
        deleteArticle(id);
    };

    return { isLoading, fetchError, messageError, data, remove };
};

export default useFetchArticles;
