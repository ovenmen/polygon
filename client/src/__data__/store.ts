import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './services/articles';
import { setupListeners } from '@reduxjs/toolkit/query';

import appReducer from './slices/app';

const store = configureStore({
    reducer: {
        app: appReducer,
        [articlesApi.reducerPath]: articlesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(articlesApi.middleware),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
