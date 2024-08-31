import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://obbaramarket-backend.onrender.com";
export const CACHE_DURATION = 5000 * 1000;

export const fetchBlogsAndAuthors = createAsyncThunk(
  "blogs/fetchBlogsAndAuthors",
  async ({ ignoreCache = false } = {}, { getState, dispatch, rejectWithValue }) => {
    const {
      user: {
        global_user: { token },
      },
      blogs: { lastFetched },
    } = getState();

    // Verificación del token y de la caché
    console.log("Verificando token:", token);
    console.log("Última vez que se obtuvo la caché:", lastFetched);

    if (!token) {
      console.error("Token de autenticación no disponible");
      return rejectWithValue("Token de autenticación no disponible");
    }

    const now = Date.now();
    if (!ignoreCache && lastFetched && now - lastFetched < CACHE_DURATION) {
      console.log("Datos ya están en caché");
      return rejectWithValue("Datos ya están en caché");
    }

    try {
      // Agregamos un log justo antes de la solicitud fetch
      console.log("Realizando solicitud a:", `${API_BASE_URL}/api/ObbaraMarket/blogs`);

      const response = await fetch(`${API_BASE_URL}/api/ObbaraMarket/blogs`);
      console.log("Respuesta de blogs:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      console.log("Datos de blogs recibidos:", data);

      const blogsWithAuthors = await Promise.all(
        data.map(async (blog) => {
          try {
            const authorId = blog.user;
            const authorResponse = await fetch(
              `${API_BASE_URL}/api/ObbaraMarket/user/${authorId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Respuesta del autor:", authorResponse);

            if (!authorResponse.ok) {
              throw new Error("Failed to fetch author data");
            }

            const authorData = await authorResponse.json();
            console.log("Datos del autor recibidos:", authorData);

            return { ...blog, author: authorData.global_user };
          } catch (error) {
            console.error("Error al obtener datos del autor:", error);
            return { ...blog, author: null };
          }
        })
      );

      dispatch(setBlogsAndAuthors(blogsWithAuthors));
      dispatch(setLastFetched(now));

      return blogsWithAuthors;
    } catch (error) {
      console.error("Error al obtener blogs:", error);
      return rejectWithValue(error.message);
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    authorsById: {},
    status: "idle",
    error: null,
    lastFetched: null,
  },
  reducers: {
    setBlogsAndAuthors: (state, action) => {
      state.status = "succeeded";
      state.blogs = action.payload.map((blog) => ({
        ...blog,
        author: blog.author ? blog.author._id : null,
        createdAt: new Date(blog.createdAt).toLocaleDateString(),
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
      state.status = "failed";
      state.error = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    clearBlogs: (state) => {
      state.blogs = [];
      state.authorsById = {};
      state.status = "idle";
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsAndAuthors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogsAndAuthors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
        console.log("Blogs en el estado después de la carga:", state.blogs);
      })
      .addCase(fetchBlogsAndAuthors.rejected, (state, action) => {
        if (action.payload !== "Datos ya están en caché") {
          state.status = "failed";
          state.error = action.error.message;
          console.error("Error al cargar blogs:", action.error.message);
        }
      });
  },
});

export const {
  setBlogsAndAuthors,
  setLastFetched,
  setError,
  resetStatus,
  clearBlogs,
} = blogsSlice.actions;

export default blogsSlice.reducer;

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectAuthors = (state) => Object.values(state.blogs.authorsById);
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsError = (state) => state.blogs.error;
