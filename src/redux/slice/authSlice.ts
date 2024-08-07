import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export interface User {
  email: string;
  fullName: string;
  avatar: string;
  aboutMe: string;
}

const getUserDataFromLocalStorage = (): User | null => {
  const userData = localStorage.getItem("userdata");
  return userData ? JSON.parse(userData) : null;
};

const initialState: AuthState = {
  isLoggedIn: !!getUserDataFromLocalStorage(),
  user: getUserDataFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state: AuthState, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("userdata", JSON.stringify(action.payload)); // Save user data to local storage
    },
    logout(state: AuthState) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("userdata");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
