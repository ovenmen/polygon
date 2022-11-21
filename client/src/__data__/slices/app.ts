import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { getCookie, setCookie } from '../tools/cookie';

const initialState = {
    appName: 'Polygon Headless CMS',
    token: getCookie('token')
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setToken: (state, action) => {
            setCookie({ cookieName: 'token', cookieValue: action.payload, secure: true, path: '/admin', maxAge: 900 });
            state.token = getCookie('token');
        }
    },
});

export const { setToken } = appSlice.actions;

export const token = (state: RootState) => state.app.token;
export const appName = (state: RootState) => state.app.appName;

export default appSlice.reducer;
