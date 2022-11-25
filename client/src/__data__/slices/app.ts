import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { getCookie, removeCookie, setCookie } from '../tools/cookie';

const initialState = {
    appName: 'Polygon Headless CMS',
    accessToken: getCookie('accessToken') || ''
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setToken: (state, action) => {
            setCookie({ cookieName: 'accessToken', cookieValue: action.payload, secure: true, path: '/admin', maxAge: 900 });
            state.accessToken = action.payload;
        },
        logout: (state) => {
            removeCookie('accessToken');
            state.accessToken = '';
        }
    },
});

export const { setToken, logout } = appSlice.actions;

export const accessToken = (state: RootState) => state.app.accessToken;
export const appName = (state: RootState) => state.app.appName;

export default appSlice.reducer;
