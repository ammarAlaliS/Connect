import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://obbaramarket-backend-1.onrender.com';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const fetchBlogsAndAuthors = createAsyncThunk(
  'blogs/fetchBlogsAndAuthors',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { user: { global_user: { token } }, blogs: { lastFetched } } = getState();

    if (!token) {
      return rejectWithValue('Token de autenticación no disponible');
    }

    const now = Date.now();
    if (lastFetched && (now - lastFetched) < CACHE_DURATION) {
      return rejectWithValue('Datos ya están en caché');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/ObbaraMarket/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();

      const blogsWithAuthors = await Promise.all(data.map(async (blog) => {
        try {
          const authorId = blog.user;
          const authorResponse = await fetch(`${API_BASE_URL}/api/ObbaraMarket/user/${authorId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!authorResponse.ok) {
            throw new Error('Failed to fetch author data');
          }

          const authorData = await authorResponse.json();
          return { ...blog, author: authorData.global_user };
        } catch (error) {
          return { ...blog, author: null };
        }
      }));

      dispatch(setBlogsAndAuthors(blogsWithAuthors));
      dispatch(setLastFetched(now));

      return blogsWithAuthors;
    } catch (error) {
      throw error;
    }
  }
);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    authorsById: {},
    status: 'idle',
    error: null,
    lastFetched: null,
  },
  reducers: {
    setBlogsAndAuthors: (state, action) => {
      state.status = 'succeeded';
      state.blogs = action.payload.map(blog => ({
        ...blog,
        author: blog.author ? blog.author._id : null,
        createdAt: new Date(blog.createdAt).toLocaleDateString()
      }));

      const authorsById = action.payload.reduce((acc, blog) => {
        if (blog.author) {
          acc[blog.author._id] = blog.author;
        }
        return acc;
      }, {});

      state.authorsById = authorsById;
    },
    setLastFetched: (state, action) => {
      state.lastFetched = action.payload;
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsAndAuthors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogsAndAuthors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogsAndAuthors.rejected, (state, action) => {
        if (action.payload !== 'Datos ya están en caché') {
          state.status = 'failed';
          state.error = action.error.message;
        }
      });
  },
});

export const { setBlogsAndAuthors, setLastFetched, setError, resetStatus } = blogsSlice.actions;

export default blogsSlice.reducer;

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectAuthors = (state) => Object.values(state.blogs.authorsById);
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsError = (state) => state.blogs.error;
