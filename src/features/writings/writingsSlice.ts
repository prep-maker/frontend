import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { deleteFromStore } from '../../common/utils/store';

import { createBlock, deleteBlock, saveBlocks } from '../blocks/actions';
import { combineBlocks } from '../blocks/blocksSlice';
import {
  fetchEditingByUserId,
  updateWriting,
  deleteWriting,
  createWriting,
  fetchDoneByUserId,
  fetchWritingById,
} from './actions';
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
        state.allIds = [];
        state.byId = {};
        const writings = action.payload;

        for (const writing of writings) {
          addWritingToStore(state, writing);
        }
      })
      .addCase(fetchDoneByUserId.fulfilled, (state, action) => {
        state.allIds = [];
        state.byId = {};
        const writings = action.payload;

        for (const writing of writings) {
          addWritingToStore(state, writing);
        }
      })
      .addCase(fetchWritingById.fulfilled, (state, action) => {
        addWritingToStore(state, action.payload);
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

const addWritingToStore = (
  state: WritableDraft<NormalizedObjects<Writing>>,
  writing: WritingResponse
) => {
  state.allIds.push(writing.id);
  state.byId[writing.id] = {
    ...writing,
    blocks: writing.blocks.map((block) => block.id),
  };
};

export default writingsSlice.reducer;
