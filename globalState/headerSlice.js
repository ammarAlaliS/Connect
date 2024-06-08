// headerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        headerVisible: true,
    },
    reducers: {
        toggleHeaderVisibility: state => {
            state.headerVisible = !state.headerVisible;
        },
        setHeaderVisibility: (state, action) => {
            state.headerVisible = action.payload;
        }
    }
});

export const { toggleHeaderVisibility, setHeaderVisibility } = headerSlice.actions;
export default headerSlice.reducer;
