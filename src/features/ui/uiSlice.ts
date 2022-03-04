import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  error?: string;
  show: {
    writingList: boolean;
  };
};

const initialState: UIState = {
  error: undefined,
  show: {
    writingList: false,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleWritingList: (state) => {
      state.show.writingList = !state.show.writingList;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
});

export const { alertError, toggleWritingList } = uiSlice.actions;
export const { toggleWritingList, clearError } = uiSlice.actions;

export default uiSlice.reducer;
