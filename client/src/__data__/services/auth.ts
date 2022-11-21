import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).app.token;

            if (token) {
                headers.set('authentication', `Bearer ${token}`);
            }

            return headers;
        }
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
