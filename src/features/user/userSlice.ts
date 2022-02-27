import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  userId: string;
  email: string;
  name: string;
  token: string;
};

const initialState: UserState = {
  userId: '',
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
