import { createSlice } from "@reduxjs/toolkit";

const marketSlice = createSlice({
  name: "market",
  initialState: {
    idProduct: 1,
    userName: "UserA",
    urlProductImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    urlSellerImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
  },
  reducers: {
    setProduct: (state, action) => {
      state.idProduct = action.payload.idProduct;
      state.userName = action.payload.userName;
      state.urlProductImage = action.payload.urlProductImage;
      state.urlSellerImage = action.payload.urlSellerImage;
    },
  },
});

export const { setProduct } = marketSlice.actions;
export default marketSlice.reducer;
