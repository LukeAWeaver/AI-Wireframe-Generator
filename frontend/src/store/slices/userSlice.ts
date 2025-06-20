import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  uuid: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: null,
  uuid: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; uuid: string }>) => {
      state.username = action.payload.username;
      state.uuid = action.payload.uuid;
      state.isAuthenticated = true;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUser: (state) => {
      state.username = null;
      state.uuid = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUsername, clearUser } = userSlice.actions;
export default userSlice.reducer; 