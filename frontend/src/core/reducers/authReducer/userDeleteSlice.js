import { createSlice } from "@reduxjs/toolkit";

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: {
    userDeleteSuccess: false,
    loading: false,
    error: false,
  },
  reducers: {
    setSuccess(state) {
      state.userDeleteSuccess = true;
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

export const userDeleteAction = deleteUserSlice.actions;

export default deleteUserSlice.reducer;
