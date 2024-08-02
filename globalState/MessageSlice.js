import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    totalMessages: 0,
    totalPages: 0,
    currentPage: 1,
    conversations: [],
    loading: false,
    error: null,
    unreadMessages: {},
  },
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload.conversations;
      state.totalMessages = action.payload.totalMessages;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    markMessageAsRead(state, action) {
      const messageId = action.payload._id;
      state.unreadMessages[messageId] = false;
      state.conversations.forEach(conversation => {
        const messageIndex = conversation.messages.findIndex(msg => msg._id === messageId);
        if (messageIndex !== -1) {
          conversation.messages[messageIndex].read = true;
        }
      });
    }
  },
});

export const { setConversations, setLoading, setError, markMessageAsRead } = messageSlice.actions;
export default messageSlice.reducer;
