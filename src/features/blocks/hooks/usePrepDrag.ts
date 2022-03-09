import { BlockType } from '../types';
import { ConnectDragPreview, ConnectDragSource, useDrag } from 'react-dnd';

import { useAppDispatch } from '../../../common/hooks/useRedux';
import { combineBlocks } from '../blocksSlice';

type DropResult = {
  id: string;
};

const usePrepDrag = (
  type: BlockType,
  blockId: string,
  writingId: string
): [unknown, ConnectDragSource, ConnectDragPreview] => {
  const dispatch = useAppDispatch();

  return useDrag(() => ({
    type,
    item: { id: blockId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();

      if (!(item && dropResult)) {
        return;
      }

      dispatch(
        combineBlocks({
          targetId: dropResult.id,
          combinedId: item.id,
          writingId,
        })
      );
    },
  }));
};

export default usePrepDrag;
