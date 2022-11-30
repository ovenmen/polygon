import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../../__data__/constant';
import { RootState } from '../store';

// Define a service using a base URL and expected endpoints
export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).app.accessToken;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: () => 'articles',
        }),
        getArticle: builder.query({
            query: (id) => `articles/${id}`,
        }),
        createArticle: builder.mutation({
            query: (formData) => ({
                url: 'articles',
                method: 'POST',
                body: formData
            })
        }),
        updateArticle: builder.mutation({
            query: ({ id, formData }) => ({
                url: `articles/${id}`,
                method: 'PATCH',
                body: formData
            })
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetArticlesQuery,
    useGetArticleQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation
} = articlesApi;
