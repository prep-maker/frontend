import React, { memo, useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { deleteBlock } from '../../actions';

import { Paragraph } from '../../blocksSlice';
import ParagraphItem from '../ParagraphItem/ParagraphItem';
import styles from './BlockItem.module.css';

type BlockItemProps = {
  id: string;
  paragraphs: Paragraph[];
};

const BlockItem = ({ id, paragraphs }: BlockItemProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);
  const writingId = useAppSelector(({ writings }) => writings.current);

  const handleDelete = useCallback(() => {
    dispatch(deleteBlock({ userId, writingId, blockId: id }));
  }, [userId, writingId, id]);

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleDelete}>
        <AiOutlineClose />
      </button>
      {paragraphs.map((paragraph) => (
        <ParagraphItem
          key={paragraph.type}
          type={paragraph.type}
          content={paragraph.content}
        />
      ))}
    </div>
  );
};

export default memo(BlockItem);
