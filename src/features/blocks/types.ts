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

export type ParagraphType = 'P' | 'R' | 'E' | 'P';

export type NewBlockRequest = {
  userId: string;
  writingId: string;
  types: ParagraphType[];
};

export type IdParams = {
  userId: string;
  writingId: string;
  blockId: string;
};
