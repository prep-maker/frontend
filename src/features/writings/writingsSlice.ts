import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NormalizedObjects } from '../../common/types/state';
import { IWritingAPI, WritingResponse } from './writingAPI';

export type Writing = {
  id: string;
  title: string;
  isDone: boolean;
  blocks: string[];
};

const initialState: NormalizedObjects<Writing> & { current: string } = {
  allIds: [],
  byId: {},
  current: '',
};

export const fetchEditingWritingsByUserId = createAsyncThunk<
  WritingResponse[],
  string,
  { extra: { writingAPI: IWritingAPI } }
>('writings/fetchEditingByUserIdStatus', async (userId: string, { extra }) => {
  const result = await extra.writingAPI.getEditingByUserId(userId);

  return result;
});

export const writingsSlice = createSlice({
  name: 'writing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEditingWritingsByUserId.fulfilled, (state, action) => {
      const writings = action.payload;
      const ids = writings.map((writing) => writing.id);
      state.allIds = ids;
      state.current = ids[ids.length - 1];

      for (const writing of writings) {
        state.byId[writing.id] = {
          id: writing.id,
          title: writing.title,
          isDone: writing.isDone,
          blocks: writing.blocks.map((block) => block.id),
        };
      }
    });
  },
});

export default writingsSlice.reducer;
