import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSourceMonitor,
  useDrag,
} from 'react-dnd';

import ERROR from '../../../common/constants/error';
import { useAppDispatch } from '../../../common/hooks/useRedux';
import { alertError } from '../../ui/uiSlice';
import { BlockType } from '../types';
import { combineBlocks } from '../blocksSlice';

type DropResult = {
  id: string;
  warning: string;
};

const usePrepDrag = (
  type: BlockType,
  blockId: string,
  writingId: string,
  warning: string
): [unknown, ConnectDragSource, ConnectDragPreview] => {
  const dispatch = useAppDispatch();

  const handleDropEnd = (item: { id: string }, monitor: DragSourceMonitor) => {
    const dropResult = monitor.getDropResult<DropResult>();

    if (!(item && dropResult)) {
      return;
    }

    if (dropResult.warning || warning) {
      dispatch(alertError(ERROR.CORRECTION_REQUIRED));
      return;
    }

    dispatch(
      combineBlocks({
        targetId: dropResult.id,
        combinedId: item.id,
        writingId,
      })
    );
  };

  return useDrag(
    () => ({
      type,
      item: { id: blockId },
      end: (item, monitor) => handleDropEnd(item, monitor),
    }),
    [warning, type]
  );
};

export default usePrepDrag;
