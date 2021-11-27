import { createSlice } from "@reduxjs/toolkit";

const productReviewsSlice = createSlice({
  name: "productRevies",
  initialState: {
    productReviewsSuccess: false,
    loading: false,
    error: false,
  },

  reducers: {
    setProductReviews(state) {
      state.productReviewsSuccess = true;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setReset(state) {
      state.productReviewsSuccess = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const productReviewsActions = productReviewsSlice.actions;

export default productReviewsSlice.reducer;
