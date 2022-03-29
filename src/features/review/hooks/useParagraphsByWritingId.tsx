import { BLOCK_TYPE } from '../../../common/constants/block';
import { useAppSelector } from '../../../common/hooks/useRedux';
import { Block } from '../../blocks/blocksSlice';

const useParagraphsByWritingId = (writingId: string) => {
  const writing = useAppSelector(({ writings }) => writings.byId[writingId]);
  const blockId: string = writing?.blocks[0];
  const block: Block = useAppSelector(({ blocks }) => blocks.byId[blockId]);

  if (block.type !== BLOCK_TYPE.PREP) {
    console.error(
      'useParagraphsByWritingId는 PREP 블록에서만 호출할 수 있습니다.'
    );

    return [];
  }

  return block.paragraphs;
};

export default useParagraphsByWritingId;
