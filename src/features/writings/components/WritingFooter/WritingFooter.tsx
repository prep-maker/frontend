import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../../common/components/Button/Button';
import { BLOCK_TYPE } from '../../../../common/constants/block';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { alertError } from '../../../ui/uiSlice';
import { saveBlocks } from '../../../blocks/actions';
import useBlocksByWritingId from '../../../blocks/hooks/useBlocksByWritingId';
import { deleteWriting, updateWriting } from '../../actions';
import styles from './WritingFooter.module.css';

const WritingFooter = () => {
  const { writingId } = useParams();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);
  const writing = useAppSelector(
    ({ writings }) => writings.byId[writingId as string]
  );
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    if (!writing) {
      return;
    }

    dispatch(deleteWriting({ userId, writingId: writingId as string }));
    navigate('/writing');
  }, [userId, writingId]);

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

  const blocks = useBlocksByWritingId(writingId as string);

  const handleSave = () => {
    dispatch(saveBlocks({ userId, writingId: writing.id, blocks }));
  };

  if (!writing) {
    return <div className={styles.wrapper} />;
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

export default WritingFooter;
