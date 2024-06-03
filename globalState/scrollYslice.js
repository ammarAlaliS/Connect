import { createSlice } from "@reduxjs/toolkit";

const scrollYSlice = createSlice({
    name: 'scrollY',
    initialState: {
        position: 0,
    },
    reducers: {
        setScrollPosition: (state, action) => {
            state.position = action.payload;
        },
      
    },
});

export const { setScrollPosition, scrollToTop } = scrollYSlice.actions;
export default scrollYSlice.reducer;
