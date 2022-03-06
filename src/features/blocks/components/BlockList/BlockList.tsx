import React, { memo } from 'react';

import useCurrentBlocks from '../../hooks/useCurrentBlocks';
import BlockItem from '../BlockItem/BlockItem';

const BlockList = () => {
  const blocks = useCurrentBlocks();

  return (
    <>
      {blocks.length ? (
        <ul>
          {blocks.map((block) => (
            <li key={block.id}>
              <BlockItem id={block.id} paragraphs={block.paragraphs} />
            </li>
          ))}
        </ul>
      ) : (
        <div>블록이 없습니다.</div>
      )}
    </>
  );
};

export default memo(BlockList);
