import React, { useCallback } from 'react';

import Button from '../../../../common/components/Button/Button';
import { BLOCK_TYPE } from '../../../../common/constants/block';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { alertError } from '../../../ui/uiSlice';
import useCurrentWriting from '../../hooks/useCurrentWriting';
import { deleteWriting, updateWriting } from '../../actions';
import styles from './WritingFooter.module.css';

const WritingFooter = () => {
  const writing = useCurrentWriting();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);

  const handleDelete = useCallback(() => {
    if (!writing) {
      return;
    }

    dispatch(deleteWriting({ userId, writingId: writing.id }));
  }, [userId, writing?.isDone]);

  const blocksById = useAppSelector(({ blocks }) => blocks.byId);
  const handleFinish = useCallback(() => {
    if (!writing) {
      return;
    }

    if (writing.blocks.length !== 1) {
      alertError('블록이 1개일때만 완료할 수  있습니다.');
      return;
    }

    const blockId = writing.blocks[0];

    if (blocksById[blockId].type !== BLOCK_TYPE.PREP) {
      alertError('PREP 블럭만 완료할 수 있습니다.');
      return;
    }

    const finished = {
      id: writing.id,
      title: writing.title,
      isDone: true,
    };
    dispatch(updateWriting({ userId, writing: finished }));
  }, [writing, userId]);

  const handleSave = () => {};

  if (!writing) {
    return <WritingFooterSkeleton />;
  }

  return (
    <div className={styles.wrapper}>
      <Button
        value="삭제"
        color="magenta"
        size="short"
        onClick={handleDelete}
      />
      <div className={styles.column}>
        <div className={styles.middle}>
          <Button
            value="완료"
            color="yellow"
            size="short"
            onClick={handleFinish}
          />
        </div>
        <Button value="저장" color="blue" size="short" onClick={handleSave} />
      </div>
    </div>
  );
};

export const WritingFooterSkeleton = () => {
  const ButtonSkeleton = (
    <Button
      value=""
      color="gray"
      size="short"
      border={false}
      onClick={() => {}}
    />
  );
  return (
    <div className={styles.wrapper}>
      {ButtonSkeleton}
      <div className={styles.column}>
        <div className={styles.middle}>{ButtonSkeleton}</div>
        {ButtonSkeleton}
      </div>
    </div>
  );
};

export default WritingFooter;
