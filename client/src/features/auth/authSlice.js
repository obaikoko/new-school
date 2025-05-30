import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const user = sessionStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  }
  return null;
};
const initialState = {
  user: getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem('User', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem('User');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
