import { useAppSelector } from '../../../common/hooks/useRedux';
import { Block } from '../blocksSlice';

const useBlocksByWritingId = (writingId: string): Block[] => {
  const writing = useAppSelector(({ writings }) => writings.byId[writingId]);
  const blocksById = useAppSelector(({ blocks }) => blocks.byId);
  const currentBlocks = writing?.blocks;

  return currentBlocks?.map((id) => blocksById[id]);
};

export default useBlocksByWritingId;
