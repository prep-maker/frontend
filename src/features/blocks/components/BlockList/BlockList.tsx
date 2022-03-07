import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import useBlocksByWritingId from '../../hooks/useBlocksByWritingId';
import BlockItem from '../BlockItem/BlockItem';
import styles from './BlockList.module.css';

const BlockList = () => {
  const { writingId } = useParams();
  const blocks = useBlocksByWritingId(writingId as string);

  return (
    <>
      {blocks?.length ? (
        <ul>
          {blocks.map((block) => (
            <li key={block.id}>
              <BlockItem id={block.id} paragraphs={block.paragraphs} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.message}>내용이 없습니다.</div>
      )}
    </>
  );
};

export default memo(BlockList);
