import { createSlice } from "@reduxjs/toolkit";

const productTopSlice = createSlice({
  name: "topProduct",
  initialState: {
    topProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.topProducts = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const getTopProductsAction = productTopSlice.actions;

export default productTopSlice.reducer;
