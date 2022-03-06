import { createSlice } from '@reduxjs/toolkit';
import { NormalizedObjects } from '../../common/types/state';
import { createBlock } from './actions';
import { BlockType, ParagraphType } from './types';

type Paragraph = {
  readonly type: ParagraphType;
  readonly content: string;
};

export type Block = {
  readonly id: string;
  readonly type: BlockType;
  readonly paragraphs?: Paragraph[];
};

const initialState: NormalizedObjects<Block> & { current: string } = {
  allIds: [],
  byId: {},
  current: '',
};

export const blocksSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBlock.fulfilled, (state, action) => {
      const blocks = action.payload;

      for (const block of blocks) {
        console.log(block.id);
        state.allIds.push(block.id);
        state.byId[block.id] = block;
      }
    });
  },
});

export default blocksSlice.reducer;
