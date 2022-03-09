import { ConnectDropTarget, useDrop } from 'react-dnd';
import { BlockType } from '../types';

const mergePair: { [K in BlockType]: BlockType[] } = {
  P: ['R', 'RE', 'REP'],
  R: ['E', 'EP'],
  E: ['P'],
  PR: ['E', 'EP'],
  RE: ['P'],
  EP: [],
  PRE: ['P'],
  REP: [],
  PREP: ['PREP'],
};

const usePrepDrop = (
  type: BlockType,
  id: string
): [{ isOver: boolean }, ConnectDropTarget] =>
  useDrop(() => ({
    accept: mergePair[type],
    drop: () => ({ id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

export default usePrepDrop;
