import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { deleteFromStore } from '../../common/utils/store';
import {
  fetchEditingByUserId,
  deleteWriting,
  fetchDoneByUserId,
} from '../writings/actions';
import { WritingResponse } from '../writings/writingAPI';
import { createBlock, deleteBlock, saveBlocks } from './actions';
import { BlockType, ParagraphType } from './types';

export type Paragraph = {
  readonly type: ParagraphType;
  readonly content: string;
  readonly comments: {
    author: string;
    content: string;
  }[];
};

export type Block = {
  readonly id: string;
  readonly type: BlockType;
  readonly paragraphs: Paragraph[];
};

const initialState: NormalizedObjects<Block> = {
  allIds: [],
  byId: {},
};

export const blocksSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    updateParagraph: (state, action) => {
      const { blockId, index, value } = action.payload;
      state.byId[blockId].paragraphs[index].content = value;
    },
    combineBlocks: (state, action) => {
      const { targetId, combinedId } = action.payload;
      const target = state.byId[targetId];
      const merged = state.byId[combinedId];
      target.paragraphs.push(...merged.paragraphs);

      if (target.type !== 'PREP') {
        state.byId[targetId].type = (target.type + merged.type) as BlockType;
      }

      deleteFromStore(state, combinedId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditingByUserId.fulfilled, (state, action) => {
        const writings = action.payload;
        setBlocks(state, writings);
      })
      .addCase(fetchDoneByUserId.fulfilled, (state, action) => {
        const writings = action.payload;
        setBlocks(state, writings);
      })
      .addCase(createBlock.fulfilled, (state, action) => {
        const { blocks } = action.payload;

        for (const block of blocks) {
          state.allIds.push(block.id);
          state.byId[block.id] = block;
        }
      })
      .addCase(deleteBlock.fulfilled, (state, action) => {
        const { blockId } = action.payload;
        deleteFromStore(state, blockId);
      })
      .addCase(saveBlocks.fulfilled, (state, action) => {
        const { newBlocks, oldBlocks } = action.payload;

        oldBlocks.forEach((block) => deleteFromStore(state, block.id));

        for (const block of newBlocks) {
          state.allIds.push(block.id);
          state.byId[block.id] = block;
        }
      })
      .addCase(deleteWriting.fulfilled, (state, action) => {
        const { blocks } = action.payload;
        blocks.forEach((block) => deleteFromStore(state, block.id));
      });
  },
});

const setBlocks = (
  state: WritableDraft<NormalizedObjects<Block>>,
  writings: WritingResponse[]
) => {
  state.byId = {};
  state.allIds = [];

  for (const writing of writings) {
    const blockIds = writing.blocks.map((block) => block.id);
    state.allIds.push(...blockIds);

    for (const block of writing.blocks) {
      state.byId[block.id] = block;
    }
  }
};

export const { updateParagraph, combineBlocks } = blocksSlice.actions;

export default blocksSlice.reducer;
