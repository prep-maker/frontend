import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSourceMonitor,
  useDrag,
} from 'react-dnd';

import { useAppDispatch } from '../../../common/hooks/useRedux';
import { BlockType } from '../types';
import { combineBlocks } from '../blocksSlice';
import { alertError } from '../../ui/uiSlice';

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
      dispatch(alertError('블록을 합치려면 문단을 올바르게 작성해야 합니다.'));
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
