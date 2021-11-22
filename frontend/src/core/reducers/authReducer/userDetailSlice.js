import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
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

export const userDetailActions = userDetailSlice.actions;

export default userDetailSlice.reducer;
