import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { deleteBlock } from '../../actions';
import { Block, combineBlocks } from '../../blocksSlice';
import { BlockType } from '../../types';
import ParagraphItem from '../ParagraphItem/ParagraphItem';
import Warning from '../Warning/Warning';
import styles from './BlockItem.module.css';
import usePrepDrag from '../../hooks/usePrepDrag';
import usePrepDrop from '../../hooks/usePrepDrop';

type BlockItemProps = {
  block: Block;
  combine: any;
};

type DropResult = {
  id: string;
  type: BlockType;
};

const mergePair: { [K in BlockType]: BlockType[] } = {
  P: ['R', 'RE', 'REP'],
  R: ['E', 'EP'],
  E: ['P'],
  PR: ['E', 'EP'],
  RE: ['P'],
  EP: [],
  PRE: ['P'],
  REP: [],
  PREP: ['PREP'],
};

const cx = classNames.bind(styles);

const BlockItem = ({ block, combine }: BlockItemProps) => {
  const [warning, setWarning] = useState('');
  const { writingId } = useParams();
  const userId = useAppSelector(({ user }) => user.id);
  const dispatch = useAppDispatch();
  const divRef = useRef<HTMLDivElement>(null);

  const [collected, drag] = usePrepDrag(
    block.type,
    block.id,
    writingId as string
  );

  const [{ isOver }, drop] = usePrepDrop(block.type, block.id);

  const handleDelete = useCallback(() => {
    dispatch(
      deleteBlock({ userId, writingId: writingId as string, blockId: block.id })
    );
  }, [userId, writingId, block]);

  drag(drop(divRef));

  return (
    <div className={cx('wrapper', { isOver })} ref={divRef}>
      <button className={styles.button} onClick={handleDelete}>
        <AiOutlineClose />
      </button>
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
