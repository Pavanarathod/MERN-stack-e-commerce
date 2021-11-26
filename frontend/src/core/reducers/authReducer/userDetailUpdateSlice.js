import { createSlice } from "@reduxjs/toolkit";

const userDetailUpdateSlice = createSlice({
  name: "user-detail-update",
  initialState: {
    userDetailUpdateSuccess: false,
    loading: false,
    error: null,
  },
  reducers: {
    onSuccess(state, action) {
      state.userDetailUpdateSuccess = true;
      state.loading = false;
    },
    onLoding(state) {
      state.loading = true;
    },
    onError(state, action) {
      state.error = action.payload;
    },
    onReset(state) {
      state.userDetailUpdateSuccess = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const userDetailUpdateSliceActions = userDetailUpdateSlice.actions;

export default userDetailUpdateSlice.reducer;
