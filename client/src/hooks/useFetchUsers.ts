import { useCallback, useEffect, useState } from "react";
import { fetcher } from "src/utils/fetcher";

const useFetchUsers = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({
        success: false,
        count: 0,
        users: []
    });
    const [messageError, setMessageError] = useState('');
    const [fetchError, setFetchError] = useState('');

    const getUsers = useCallback(() => {
        setLoading(fetcher.isLoading);

        fetcher
            .get('http://localhost:5000/api/users')
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

    const deleteUser = useCallback((id) => {
        setLoading(fetcher.isLoading);

        fetcher
            .delete(`http://localhost:5000/api/users/${id}`)
            .then((response) => {
                setLoading(false);
                setFetchError(fetcher.fetchError);

                if (response.success) {
                    setData({
                        ...data,
                        users: data.users.filter(user => user._id !== id)
                    });
                } else {
                    setMessageError(fetcher.messageError);
                }
            });
    }, [data]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const remove = (id: string) => {
        deleteUser(id);
    };

    return { isLoading, messageError, fetchError, data, remove };
};

export default useFetchUsers;
