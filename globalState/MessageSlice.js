import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    totalMessages: 0,
    totalPages: 0,
    currentPage: 1,
    firstFetch: false,
    timeZone: '',
    messages: [],
  },
  reducers: {
    setTotalMessages(state, action) {
      state.totalMessages = action.payload;
    },
    addMessages(state, action) {
      const newMessages = action.payload;
      const messageMap = new Map(state.messages.map((msg) => [msg._id, msg]));
    
      newMessages.forEach(msg => {
        messageMap.set(msg._id, msg);
      });
    
      state.messages = Array.from(messageMap.values());
    },
    
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setTimeZone(state, action) {
      state.timeZone = action.payload;
    },
    clearMessages(state) {
      state.totalMessages = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.messages = [];
      state.firstFetch = false;
      state.timeZone = '';
    },
    setFirstFetch(state, action) {
      state.firstFetch = action.payload;
    },
  },
});

export const {
  addMessages,
  setCurrentPage,
  clearMessages,
  setTotalPages,
  setFirstFetch,
  setTotalMessages,
  setTimeZone,
} = messageSlice.actions;

export default messageSlice.reducer;
