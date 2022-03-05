import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { IAuthAPI } from './authAPI';
import { LoginInfo, User, UserState } from './types';

export const initialState: UserState = {
  id: '',
  email: '',
  name: '',
  token: '',
};

export const login = createAsyncThunk<
  UserState,
  LoginInfo,
  { extra: { authAPI: IAuthAPI } }
>('user/loginStatus', async (user, { extra }) => {
  const result = await extra.authAPI.login(user);

  return result;
});

export const signup = createAsyncThunk<
  UserState,
  User,
  { extra: { authAPI: IAuthAPI } }
>('user/logoutStatus', async (user, { extra }) => {
  const result = await extra.authAPI.signup(user);

  return result;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = '';
      state.email = '';
      state.name = '';
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const user: UserState = action.payload;
        setUser(state, user);
      })
      .addCase(signup.fulfilled, (state, action) => {
        const user: UserState = action.payload;
        setUser(state, user);
      });
  },
});

const setUser = (state: WritableDraft<UserState>, user: UserState) => {
  const { email, id, name, token } = user;
  state.id = id;
  state.email = email;
  state.name = name;
  state.token = token;
};

export const { logout } = userSlice.actions;

export default userSlice.reducer;
