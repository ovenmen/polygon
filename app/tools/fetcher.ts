const fetcher = async (url, payload, token) => {
    let isLoading = false;
    let data = null;
    let error = '';

    try {
        isLoading = true;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const responseData = await response.json();

        isLoading = false;

        if (!responseData.success) {
            error = responseData.error;
        }
        data = responseData;
    } catch (e) {
        throw new Error(e.message);
    }

    return { error, isLoading, data };
};

export default fetcher;
