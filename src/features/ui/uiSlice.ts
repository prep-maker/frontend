import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  error: string;
  showWritingList: boolean;
};

const initialState: UIState = {
  error: '',
  showWritingList: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    alertError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    toggleWritingList: (state) => {
      state.showWritingList = !state.showWritingList;
    },
  },
});

export const { alertError, toggleWritingList } = uiSlice.actions;

export default uiSlice.reducer;
