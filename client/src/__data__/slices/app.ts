import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token')
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.token = action.payload;
        }
    }
});

export const { setToken } = appSlice.actions;

export default appSlice.reducer;
