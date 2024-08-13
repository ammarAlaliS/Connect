import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    totalMessages: 0,
    totalPages: 0,
    currentPage: 1,
    firstFetch: false,
    currentDate: 'Quickcar',
    groupedMessages: [], 
  },
  reducers: {
    setTotalMessages(state, action) {
      state.totalMessages = action.payload;
    },
    setGroupedMessages(state, action) {
      const newGroupedMessages = action.payload; 
      state.groupedMessages = [...state.groupedMessages, ...newGroupedMessages];
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    clearMessages(state) {
      state.totalMessages = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.groupedMessages = [];
      state.firstFetch = false;
      state.currentDate= 'Quickcar';
    },
    setFirstFetch(state, action) {
      state.firstFetch = action.payload;
    },
  },
});

export const {
  setGroupedMessages,
  setCurrentPage,
  clearMessages,
  setTotalPages,
  setFirstFetch,
  setTotalMessages,
  setCurrentDate,
} = messageSlice.actions;

export default messageSlice.reducer;
