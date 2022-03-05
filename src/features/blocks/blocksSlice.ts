import { createSlice } from '@reduxjs/toolkit';
import { NormalizedObjects } from '../../common/types/state';
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
});

export default blocksSlice.reducer;
