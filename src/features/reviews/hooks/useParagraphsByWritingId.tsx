import { useAppSelector } from '../../../common/hooks/useRedux';
import { Block } from '../../blocks/blocksSlice';

const useParagraphsByWritingId = (writingId: string) => {
  const writing = useAppSelector(({ writings }) => writings.byId[writingId]);
  const blockId: string = writing.blocks[0];
  const block: Block = useAppSelector(({ blocks }) => blocks.byId[blockId]);
  const paragraphs: string[] = block.paragraphs.flatMap(
    (paragraph) => paragraph.content
  );

  return paragraphs;
};

export default useParagraphsByWritingId;
