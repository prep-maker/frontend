import { BlockType } from '../../features/blocks/types';

export const BLOCK_TYPE: { [T in BlockType]: T } = {
  P: 'P',
  R: 'R',
  E: 'E',
  PR: 'PR',
  RE: 'RE',
  EP: 'EP',
  PRE: 'PRE',
  REP: 'REP',
  PREP: 'PREP',
} as const;
