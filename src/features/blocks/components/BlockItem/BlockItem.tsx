import React, { memo, useCallback, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { deleteBlock } from '../../actions';

import { Paragraph } from '../../blocksSlice';
import ParagraphItem from '../ParagraphItem/ParagraphItem';
import Warning from '../Warning/Warning';
import styles from './BlockItem.module.css';

type BlockItemProps = {
  id: string;
  paragraphs: Paragraph[];
};

const BlockItem = ({ id, paragraphs }: BlockItemProps) => {
  const [warning, setWarning] = useState('');
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);
  const { writingId } = useParams();

  const handleDelete = useCallback(() => {
    dispatch(
      deleteBlock({ userId, writingId: writingId as string, blockId: id })
    );
  }, [userId, writingId, id]);

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleDelete}>
        <AiOutlineClose />
      </button>
      <Warning message={warning} />
      {paragraphs.map((paragraph, i) => (
        <ParagraphItem
          key={paragraph.type}
          type={paragraph.type}
          content={paragraph.content}
          index={i}
          blockId={id}
          setWarning={setWarning}
        />
      ))}
    </div>
  );
};

export default memo(BlockItem);
