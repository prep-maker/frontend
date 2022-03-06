import { useAppSelector } from '../../../common/hooks/useRedux';
import useCurrentWriting from '../../writings/hooks/useCurrentWriting';
import { Block } from '../blocksSlice';

const useCurrentBlocks = (): Block[] => {
  const currentWriting = useCurrentWriting();
  console.log(currentWriting);

  if (!currentWriting) {
    return [];
  }

  const blocksById = useAppSelector(({ blocks }) => blocks.byId);
  const currentBlocks = currentWriting.blocks;

  return currentBlocks.map((id) => blocksById[id]);
};

export default useCurrentBlocks;
