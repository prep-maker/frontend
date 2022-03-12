import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  createBlock,
  deleteBlock,
  finishComment,
  saveBlocks,
  updateBlock,
} from '../blocks/actions';
import { login, signup } from '../user/userSlice';
import {
  deleteWriting,
  fetchDoneByUserId,
  fetchEditingByUserId,
  fetchWritingById,
  updateWriting,
} from '../writings/actions';

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
    alertError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    handleThunkStatus(builder, login);
    handleThunkStatus(builder, signup);
    handleThunkStatus(builder, fetchEditingByUserId);
    handleThunkStatus(builder, fetchDoneByUserId);
    handleThunkStatus(builder, fetchWritingById);
    handleThunkStatus(builder, updateWriting);
    handleThunkStatus(builder, deleteWriting);
    handleThunkStatus(builder, createBlock);
    handleThunkStatus(builder, deleteBlock);
    handleThunkStatus(builder, saveBlocks);
    handleThunkStatus(builder, updateBlock);
    handleThunkStatus(builder, finishComment);
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

export const { toggleWritingList, clearError, alertError } = uiSlice.actions;

export default uiSlice.reducer;
