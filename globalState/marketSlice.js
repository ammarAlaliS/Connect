import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = "https://obbaramarket-backend.onrender.com";
const CACHE_DURATION = 3600;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const {
      user: {
        global_user: { token },
      },
      market: {
        lastFetched,
        resetProductList,
        currentPage,
        selectedclassification,
        search,
        filterUrl,
        products,
      },
    } = getState();

    if (!token) {
      return rejectWithValue("Token de autenticación no disponible");
    }

    const now = Date.now();

    try {
      dispatch(setLoadingProducts(true));

      if (resetProductList) {
        dispatch(setProducts([]));
        if (currentPage != 1) {
          dispatch(setCurrentPage(1));
        }
      }

      const url =
        `${API_BASE_URL}/api/ObbaraMarket/get/products?${
          selectedclassification.length > 0 && selectedclassification != "Todos"
            ? "productCategory=" + selectedclassification + "&"
            : ""
        }${search.length > 0 ? "search=" + search + "&" : ""}limit=10&page=${
          resetProductList ? 1 : currentPage
        }` + filterUrl;

      const response = await fetch(url, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue("Productos no encontrados");
      }

      const res = await response.text();
      const data = JSON.parse(res);

      if (resetProductList) {
        dispatch(setProducts(data.docs));
      } else {
        dispatch(setProducts([...products, ...data.docs]));
      }

      dispatch(setLastPage(data.totalPages));
      dispatch(setResetProductList(false));
      dispatch(setLastFetched(now));
      dispatch(setLoadingProducts(false));
    } catch (error) {
      console.log(error.message);
      dispatch(setResetProductList(false));
      return rejectWithValue(error.message);
    }
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState: {
    lastFetched: null,
    status: "idle",
    loadingProducts: false,
    resetProductList: true,
    currentPage: 1,
    products: [],
    selectedclassification: "Todos",
    search: "",
    filterUrl: "",
    lastPage: 1,
    filterData: {
      minPrice: -1,
      maxPrice: -1,
      minDate: null,
      maxDate: null,
    },
    selectedProduct: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    },
    setLastFetched: (state, action) => {
      state.lastFetched = action.payload;
    },
    setLoadingProducts: (state, action) => {
      state.loadingProducts = action.payload;
    },
    setResetProductList: (state, action) => {
      state.resetProductList = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setSelectedclassification: (state, action) => {
      state.selectedclassification = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilterUrl: (state, action) => {
      state.filterUrl = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.payload !== "Datos ya están en caché") {
          state.status = "failed";
        }
      });
  },
});

export const {
  setProducts,
  setLastFetched,
  setCurrentPage,
  setResetProductList,
  setLastPage,
  setLoadingProducts,
  setSelectedclassification,
  setSearch,
  setFilterData,
  setFilterUrl,
  setSelectedProduct,
} = marketSlice.actions;
export default marketSlice.reducer;
