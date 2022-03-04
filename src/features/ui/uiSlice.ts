import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { login, signup } from '../user/userSlice';
import { fetchEditingWritingsByUserId } from '../writings/writingsSlice';

type UIState = {
  error?: string;
  loading: 'idle' | 'pending';
  currentRequestId?: string;
  show: {
    writingList: boolean;
  };
};

const initialState: UIState = {
  error: undefined,
  loading: 'idle',
  currentRequestId: undefined,
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
  extraReducers: (builder) => {
    handleThunkStatus(builder, login);
    handleThunkStatus(builder, signup);
    handleThunkStatus(builder, fetchEditingWritingsByUserId);
  },
});

const handleThunkStatus = <Returned, ThunkArg, API>(
  builder: ActionReducerMapBuilder<UIState>,
  thunk: AsyncThunk<Returned, ThunkArg, { extra: API }>
) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    })
    .addCase(thunk.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error.message;
        state.currentRequestId = undefined;
      }
    });
};

export const { toggleWritingList, clearError } = uiSlice.actions;

export default uiSlice.reducer;
