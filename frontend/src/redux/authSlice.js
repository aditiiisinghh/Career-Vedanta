import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Loader
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set Full User (login / profile update ke baad)
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // Update Only Saved Jobs
    setSavedJobs: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          savedJobs: action.payload,
        };
      }
    },

    // Logout Clear
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setUser,
  setSavedJobs,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
