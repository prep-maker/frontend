import { createSlice } from '@reduxjs/toolkit';
import { deleteFromStore } from '../../common/utils/store';
import { NormalizedObjects } from '../../common/types/state';
import {
  fetchEditingByUserId,
  updateWriting,
  deleteWriting,
  createWriting,
} from './actions';
import { deleteBlock } from '../blocks/actions';

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
  reducers: {
    pickWriting: (state, action) => {
      const writingId: string = action.payload;
      state.current = writingId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditingByUserId.fulfilled, (state, action) => {
        const writings = action.payload;
        const ids = writings.map((writing) => writing.id);
        state.allIds = ids;
        state.current = ids[0];

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

        if (isDone) {
          deleteFromStore(state, id);
          return;
        }

        state.byId[id].title = title;
        state.byId[id].isDone = isDone;
      })
      .addCase(deleteWriting.fulfilled, (state, action) => {
        const id = action.payload;
        deleteFromStore(state, id);
      })
      .addCase(createWriting.fulfilled, (state, action) => {
        const { id, title, isDone } = action.payload;
        state.allIds.push(id);
        state.byId[id] = { id, title, isDone, blocks: [] };
        state.current = id;
      })
      .addCase(deleteBlock.fulfilled, (state, action) => {
        const { writingId, blockId } = action.payload;
        const blocks = state.byId[writingId].blocks;
        state.byId[writingId].blocks = blocks.filter((id) => id !== blockId);
      });
  },
});

export const { pickWriting } = writingsSlice.actions;

export default writingsSlice.reducer;
