import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show } from '../types/Show';

interface State {
    searchStatus: 'initial' | 'loading' | 'success' | 'empty' | 'failed';
    searchValue: string;
    foundShows: Show[];
}

const initialState: State = {
    searchStatus: 'initial',
    searchValue: '',
    foundShows: [],
};

const slice = createSlice({
    name: 'shows',
    initialState,
    reducers: {
        setSearchStatus: (state, action: PayloadAction<'initial' | 'loading' | 'success' | 'empty' | 'failed'>) => {
            return {
                ...state,
                searchStatus: action.payload,
            };
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                searchValue: action.payload,
            };
        },
        setFoundShows: (state, action: PayloadAction<Show[]>) => {
            return {
                ...state,
                foundShows: action.payload,
            };
        },
        resetState: () => {
            return {
                ...initialState,
            };
        },
    },
});

export const { setSearchStatus, setSearchValue, resetState, setFoundShows } = slice.actions;

export default slice.reducer;
