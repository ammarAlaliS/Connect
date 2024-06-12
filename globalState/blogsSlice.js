import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Definir una función asincrónica para obtener los blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (_, { getState }) => {
  try {
    const response = await fetch('https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket/blogs');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();

    // Obtener el token de autenticación del estado del usuario
    const state = getState();
    const token = state.user.global_user.token;

    // Obtener los datos del autor para cada blog
    const blogsWithAuthors = await Promise.all(data.map(async (blog) => {
      try {
        const authorId = blog.user;
        const authorResponse = await fetch(`https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket/user/${authorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!authorResponse.ok) {
          return { ...blog, author: null }; 
        }

        const authorData = await authorResponse.json();
        return { ...blog, author: authorData };
      } catch (error) {
        return { ...blog, author: null }; 
      }
    }));

    return blogsWithAuthors;
  } catch (error) {
    throw error;
  }
});

// Definir el slice de Redux para manejar el estado de los blogs
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogsSlice.reducer;

// Seleccionar los blogs del estado
export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsError = (state) => state.blogs.error;
