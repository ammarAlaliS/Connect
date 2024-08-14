import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    totalMessages: 0,
    totalPages: 0,
    currentPage: 1,
    firstFetch: 0,
    messages: [],
  },
  reducers: {
    setTotalMessages(state, action) {
      state.totalMessages = action.payload;
    },
    addMessages(state, action) {
      const newMessages = action.payload;
      state.messages = [...state.messages, ...newMessages];
    },
    
    addMessages(state, action) {
      const newMessages = action.payload;
      const existingMessages = state.messages.reduce((acc, msg) => {
        acc[msg._id] = msg;
        return acc;
      }, {});
    
      newMessages.forEach(msg => {
        existingMessages[msg._id] = msg;
      });
    
      state.messages = Object.values(existingMessages);
    },
    
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    clearMessages(state) {
      state.totalMessages = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.messages = []; 
      state.firstFetch = false;
    },
    setFirstFetch(state, action) {
      state.firstFetch = action.payload;
    },
  },
});

export const {
  addMessages,
  addMessage,  // Exporta la nueva acción
  setCurrentPage,
  clearMessages,
  setTotalPages,
  setFirstFetch,
  setTotalMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
