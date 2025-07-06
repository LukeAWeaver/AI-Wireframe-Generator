import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  username: string | null;
  uuid: string | null;
  build_count: number;
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  username: null,
  uuid: null,
  build_count: 0,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; uuid: string; build_count?: number }>) => {
      state.username = action.payload.username;
      state.uuid = action.payload.uuid;
      state.build_count = action.payload.build_count || 0;
      state.isAuthenticated = true;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    updateBuildCount: (state, action: PayloadAction<number>) => {
      state.build_count = action.payload;
    },
    clearUser: (state) => {
      state.username = null;
      state.uuid = null;
      state.build_count = 0;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUsername, updateBuildCount, clearUser } = userSlice.actions;
export default userSlice.reducer; 