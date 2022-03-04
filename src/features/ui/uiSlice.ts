import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  error: string;
  showWritingList: boolean;
  show: {
    writingList: boolean;
  };
};

const initialState: UIState = {
  error: '',
  showWritingList: false,
  show: {
    writingList: false,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    alertError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    toggleWritingList: (state) => {
      state.show.writingList = !state.show.writingList;
    },
  },
});

export const { alertError, toggleWritingList } = uiSlice.actions;

export default uiSlice.reducer;
