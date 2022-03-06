import React, { memo } from 'react';

import useCurrentBlocks from '../../hooks/useCurrentBlocks';
import BlockItem from '../BlockItem/BlockItem';

const BlockList = () => {
  const blocks = useCurrentBlocks();

  return (
    <ul>
      {blocks.map((block) => (
        <li key={block?.id}>
          <BlockItem id={block?.id} paragraphs={block.paragraphs} />
        </li>
      ))}
    </ul>
  );
};

export default memo(BlockList);
