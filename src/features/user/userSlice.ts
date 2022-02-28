import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './type';

export const initialState: UserState = {
  id: '',
  email: '',
  name: '',
  token: '',
};

export const uiSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { fetchUser } = uiSlice.actions;

export default uiSlice.reducer;
