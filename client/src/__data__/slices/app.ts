import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setToken } = appSlice.actions;

export default appSlice.reducer;
