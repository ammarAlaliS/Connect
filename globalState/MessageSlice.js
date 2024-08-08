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
      state.conversations = action.payload.conversations;
      state.totalMessages = action.payload.totalMessages;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setConversations } = messageSlice.actions;
export default messageSlice.reducer;
