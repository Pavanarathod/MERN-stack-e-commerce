import { createSlice } from "@reduxjs/toolkit";

const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: {
    productDeleteSuccess: false,
    loading: false,
    error: null,
  },
  reducers: {
    setProducts(state) {
      state.productDeleteSuccess = true;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.productDeleteSuccess = false;
    },
  },
});

export const productDeleteActions = productDeleteSlice.actions;

export default productDeleteSlice.reducer;
