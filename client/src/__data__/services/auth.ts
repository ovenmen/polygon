import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/'
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
