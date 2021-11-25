import { createSlice } from "@reduxjs/toolkit";

const orderPaySlice = createSlice({
  name: "updateOrder",
  initialState: {
    order: null,
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
      state.success = true;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
      state.success = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setReset(state) {
      state.success = false;
    },
  },
});

export const orderPayActions = orderPaySlice.actions;

export default orderPaySlice.reducer;
