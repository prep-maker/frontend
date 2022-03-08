import { BlockType } from '../types';
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  useDrag,
  useDrop,
} from 'react-dnd';
import { useAppDispatch } from '../../../common/hooks/useRedux';
import { mergeBlocks } from '../blocksSlice';
import { useParams } from 'react-router-dom';

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

type DropResult = {
  id: string;
};

const useDragAndDrop = (
  type: BlockType,
  id: string
): {
  useDrag: [unknown, ConnectDragSource, ConnectDragPreview];
  useDrop: [{ isOver: boolean; canDrop: boolean }, ConnectDropTarget];
} => {
  const dispatch = useAppDispatch();
  const { writingId } = useParams();
  const usePrepDrag = useDrag(() => ({
    type,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        dispatch(
          mergeBlocks({ targetId: dropResult.id, mergedId: item.id, writingId })
        );
      }
    },
  }));

  const usePrepDrop = useDrop(() => ({
    accept: mergePair[type],
    drop: () => ({ id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return { useDrag: usePrepDrag, useDrop: usePrepDrop };
};

export default useDragAndDrop;
