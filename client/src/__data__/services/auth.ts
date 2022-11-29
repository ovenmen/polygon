import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../../__data__/constant';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        sigin: builder.mutation({
            query: (formData) => ({
                url: 'users/sigin',
                method: 'POST',
                body: formData
            })
        })
    })
});

export const { useSiginMutation } = authApi;
