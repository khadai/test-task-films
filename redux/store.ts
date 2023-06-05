import { configureStore } from '@reduxjs/toolkit';
import reducer from './slice';

const store = configureStore({
    reducer: {
        shows: reducer,
    },
});

export default store;
