import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  error: string;
};

const initialState: UIState = {
  error: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    alertError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { alertError } = uiSlice.actions;

export default uiSlice.reducer;
