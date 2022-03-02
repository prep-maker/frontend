import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './type';

export const initialState: UserState = {
  id: '',
  email: '',
  name: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.id = '';
      state.email = '';
      state.name = '';
      state.token = '';
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
