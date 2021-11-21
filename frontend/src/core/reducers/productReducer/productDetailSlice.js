import { createSlice } from "@reduxjs/toolkit";

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    products: {},
    loading: false,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const productDetailActions = productDetailSlice.actions;

export default productDetailSlice.reducer;
