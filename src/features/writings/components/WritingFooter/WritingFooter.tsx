import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../../common/components/Button/Button';
import ERROR from '../../../../common/constants/error';
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
  const { writingId } = useParams<WritingIdParam>() as WritingIdParam;
  const userId = useAppSelector(({ user }) => user.id);
  const writing = useAppSelector(({ writings }) => writings.byId[writingId]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(() => {
    dispatch(deleteWriting({ userId, writingId }));
    navigate('/writing');
  }, [userId, writingId]);

  const blocks = useBlocksByWritingId(writingId);
  const handleFinish = useCallback(async () => {
    if (blocks.length !== 1) {
      dispatch(alertError(ERROR.COMBINE_REQUIRED));
      return;
    }

    if (blocks[0].type !== BLOCK_TYPE.PREP) {
      dispatch(alertError(ERROR.PREP_REQUIRED));
      return;
    }

    const finished = {
      id: writing.id,
      title: writing.title,
      author: userId,
      isDone: true,
    };
    await dispatch(saveBlocks({ writingId: writing.id, blocks }));
    await dispatch(updateWriting(finished));
    navigate('/review');
  }, [writing, userId]);

  const handleSave = useCallback(() => {
    dispatch(saveBlocks({ writingId: writing.id, blocks }));
  }, [writing, blocks]);

  return (
    <>
      {writing ? (
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
            <Button
              value="저장"
              color="blue"
              size="short"
              onClick={handleSave}
            />
          </div>
        </div>
      ) : (
        <div className={styles.wrapper} />
      )}
    </>
  );
};

export default WritingFooter;
