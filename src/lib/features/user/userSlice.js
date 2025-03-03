import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  userId: null,
  userRole: null,
};

// Create Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userRole = action.payload.userRole;
    },
    // Clear user data (logout)
    clearUser: (state) => {
      state.userId = null;
      state.userRole = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
