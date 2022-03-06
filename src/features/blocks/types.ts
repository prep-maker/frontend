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

export type CreateRequest = {
  userId: string;
  writingId: string;
  types: ParagraphType[];
};
