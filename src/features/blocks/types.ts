import { Block } from './blocksSlice';

export type BlockType =
  | 'P'
  | 'R'
  | 'E'
  | 'PR'
  | 'RE'
  | 'EP'
  | 'PRE'
  | 'REP'
  | 'PREP';

export type ParagraphType = 'P' | 'R' | 'E';

export type NewBlockRequest = {
  writingId: string;
  types: ParagraphType[];
};

export type IdParams = {
  userId: string;
  writingId: string;
  blockId: string;
};

export type BlocksUpdateRequest = {
  writingId: string;
  blocks: Block[];
};

export type BlockUpdateRequest = {
  writingId: string;
  blockId: string;
  block: Block;
};
