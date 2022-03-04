import { createSlice } from '@reduxjs/toolkit';
import { NormalizedObjects } from '../../common/types/state';
import { fetchEditingByUserId, updateWriting } from './actions/thunks';

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

export const writingsSlice = createSlice({
  name: 'writing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditingByUserId.fulfilled, (state, action) => {
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
      })
      .addCase(updateWriting.fulfilled, (state, action) => {
        const { id, title, isDone } = action.payload;
        state.byId[id].title = title;
        state.byId[id].isDone = isDone;
      });
  },
});

export default writingsSlice.reducer;
