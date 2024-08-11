import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    totalMessages: 0,
    totalPages: 0,
    currentPage: 1,
    conversations: [],
  },
  reducers: {
    setConversations(state, action) {
      state.conversations = [...state.conversations, ...action.payload.conversations];
      state.totalMessages = action.payload.totalMessages;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    clearMessages(state) {
      state.totalMessages = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.conversations = [];
    },
  },
});

export const { setConversations, setCurrentPage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
