import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  name: null,
  email: null,
  isAuthenticated:false,
  id: null,
  role: null,
};

// Create Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    // Clear user data (logout)
    clearUser: (state) => {
      state.id= null;
      state.role= null;
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
