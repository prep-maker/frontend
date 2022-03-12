import { createSlice } from '@reduxjs/toolkit';
import { deleteFromStore } from '../../common/utils/store';
import {
  fetchEditingByUserId,
  updateWriting,
  deleteWriting,
  createWriting,
  fetchDoneByUserId,
} from './actions';
import { createBlock, deleteBlock, saveBlocks } from '../blocks/actions';
import { combineBlocks } from '../blocks/blocksSlice';
import { WritableDraft } from 'immer/dist/internal';
import { WritingResponse } from './writingAPI';

export type Writing = {
  id: string;
  title: string;
  author: string;
  isDone: boolean;
  blocks: string[];
};

const initialState: NormalizedObjects<Writing> = {
  allIds: [],
  byId: {},
};

export const writingsSlice = createSlice({
  name: 'writing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditingByUserId.fulfilled, (state, action) => {
        const writings = action.payload;
        setWritings(state, writings);
      })
      .addCase(fetchDoneByUserId.fulfilled, (state, action) => {
        const writings = action.payload;
        setWritings(state, writings);
      })
      .addCase(updateWriting.fulfilled, (state, action) => {
        const { id, title, isDone } = action.payload;

        state.byId[id].title = title;
        state.byId[id].isDone = isDone;
      })
      .addCase(deleteWriting.fulfilled, (state, action) => {
        const { id } = action.payload;
        deleteFromStore(state, id);
      })
      .addCase(createWriting.fulfilled, (state, action) => {
        const { id, title, author, isDone } = action.payload;
        state.allIds.push(id);
        state.byId[id] = { id, title, author, isDone, blocks: [] };
      })
      .addCase(deleteBlock.fulfilled, (state, action) => {
        const { writingId, blockId } = action.payload;
        const blocks = state.byId[writingId].blocks;
        state.byId[writingId].blocks = blocks.filter((id) => id !== blockId);
      })
      .addCase(createBlock.fulfilled, (state, action) => {
        const { blocks, writingId } = action.payload;
        const blockIds = blocks.map((block) => block.id);
        state.byId[writingId].blocks.push(...blockIds);
      })
      .addCase(saveBlocks.fulfilled, (state, action) => {
        const { writingId, newBlocks } = action.payload;
        const blockIds = newBlocks.map((block) => block.id);
        state.byId[writingId].blocks = blockIds;
      })
      .addCase(combineBlocks, (state, action) => {
        const { writingId, combinedId } = action.payload;
        const blocks = state.byId[writingId].blocks;
        state.byId[writingId].blocks = blocks.filter((id) => id !== combinedId);
      });
  },
});

const setWritings = (
  state: WritableDraft<NormalizedObjects<Writing>>,
  writings: WritingResponse[]
) => {
  const ids = writings.map((writing) => writing.id);
  state.allIds = ids;
  state.byId = {};

  for (const writing of writings) {
    state.byId[writing.id] = {
      id: writing.id,
      author: writing.author,
      title: writing.title,
      isDone: writing.isDone,
      blocks: writing.blocks.map((block) => block.id),
    };
  }
};

export default writingsSlice.reducer;
