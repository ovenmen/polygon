import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

const initialState = {
    appName: 'Polygon Headless CMS',
    token: document.cookie.match(/token/)?.input?.replace(/token=/, '')
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setToken: (state, action) => {
            document.cookie = `token=${action.payload}; secure; path=/admin; max-age=54000`;
            state.token = action.payload;
        }
    }
});

export const { setToken } = appSlice.actions;

export const token = (state: RootState) => state.app.token;
export const appName = (state: RootState) => state.app.appName;

export default appSlice.reducer;
