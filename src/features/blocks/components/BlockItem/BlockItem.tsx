import React, { memo, useCallback, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { deleteBlock } from '../../actions';
import { Block } from '../../blocksSlice';
import ParagraphItem from '../ParagraphItem/ParagraphItem';
import Warning from '../Warning/Warning';
import usePrepDrag from '../../hooks/usePrepDrag';
import usePrepDrop from '../../hooks/usePrepDrop';
import styles from './BlockItem.module.css';

type BlockItemProps = {
  block: Block;
};

const cx = classNames.bind(styles);

const BlockItem = ({ block }: BlockItemProps) => {
  const { writingId } = useParams<WritingIdParam>() as WritingIdParam;
  const [warning, setWarning] = useState('');

  const [, drag] = usePrepDrag(block.type, block.id, writingId, warning);
  const [{ isOver }, drop] = usePrepDrop(block.type, block.id, warning);

  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);
  const handleDelete = useCallback(() => {
    dispatch(deleteBlock({ userId, writingId, blockId: block.id }));
  }, [userId, writingId, block]);

  const divRef = useRef<HTMLDivElement>(null);
  drag(drop(divRef));

  return (
    <div className={cx('wrapper', { isOver })} ref={divRef}>
      <header className={styles.header}>
        <button className={styles.button} onClick={handleDelete}>
          <AiOutlineClose />
        </button>
        <div className={styles.type}>{block.type}</div>
      </header>
      <Warning message={warning} />
      {block.paragraphs.map((paragraph, i) => (
        <ParagraphItem
          key={i}
          type={paragraph.type}
          content={paragraph.content}
          index={i}
          blockId={block.id}
          onWarning={setWarning}
        />
      ))}
    </div>
  );
};

export default memo(BlockItem);
