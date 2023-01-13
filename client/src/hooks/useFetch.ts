import { useCallback, useEffect, useState } from "react";
import { fetcher } from "src/utils/fetcher";

const useFetch = (initialUrl) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({
        success: false,
        count: 0,
        articles: []
    });
    const [error, setError] = useState('');

    const fetchData = useCallback(() => {
        setLoading(fetcher.isLoading);

        fetcher
            .get(initialUrl)
            .then((response) => {
                setLoading(false);
                setError(fetcher.error);
                setData(response);
            });
    }, [initialUrl]);

    const deleteData = useCallback((url, id) => {
        setLoading(fetcher.isLoading);

        fetcher
            .delete(`${url}/${id}`)
            .then(() => {
                setLoading(false);
                setError(fetcher.error);
                setData({
                    ...data,
                    articles: data.articles.filter(article => article._id !== id)
                });
            });
    }, [data]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => {
        fetchData();
    };

    const remove = (url: string, id: string) => {
        deleteData(url, id);
    };

    return { isLoading, error, data, refetch, remove };
};

export default useFetch;
