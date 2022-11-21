import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { getCookie, removeCookie, setCookie } from '../tools/cookie';

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
            state.token = action.payload;
        },
        logout: (state) => {
            removeCookie('token');
            state.token = '';
        }
    },
});

export const { setToken, logout } = appSlice.actions;

export const accessToken = (state: RootState) => state.app.token || '';
export const appName = (state: RootState) => state.app.appName || '';

export default appSlice.reducer;
