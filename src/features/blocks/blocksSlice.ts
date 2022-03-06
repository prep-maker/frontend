import { createSlice } from '@reduxjs/toolkit';
import { NormalizedObjects } from '../../common/types/state';
import { deleteFromStore } from '../../common/utils/store';
import { createBlock, deleteBlock } from './actions';
import { BlockType, ParagraphType } from './types';

export type Paragraph = {
  readonly type: ParagraphType;
  readonly content: string;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default blocksSlice.reducer;
