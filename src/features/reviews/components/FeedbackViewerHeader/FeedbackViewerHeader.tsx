import React, { memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../../../common/components/Button/Button';
import { useAppDispatch } from '../../../../common/hooks/useRedux';
import { updateBlock } from '../../../blocks/actions';
import { cancelPendingComment, Comment } from '../../../blocks/blocksSlice';
import useBlocksByWritingId from '../../../blocks/hooks/useBlocksByWritingId';
import styles from './FeedbackViewerHeader.module.css';

const FeedbackViewerHeader = ({ comments }: { comments: Comment[] }) => {
  const [showSelect, setShowSelect] = useState(false);
  const { writingId } = useParams<keyof WritingIdParam>() as WritingIdParam;
  const block = useBlocksByWritingId(writingId)[0];
  const pendings = comments.filter((comment) => comment.isPending);
  const dispatch = useAppDispatch();

  const handleClickFinish = useCallback(() => {
    setShowSelect((prev) => !prev);
  }, []);

  const handleClickSending = useCallback(() => {
    dispatch(updateBlock({ writingId, blockId: block.id, block }));
  }, [writingId, block]);

  const handleClickCancel = useCallback(() => {
    dispatch(cancelPendingComment(block.id));
  }, [block.id]);

  return (
    <header className={styles.wrapper}>
      <Button
        value={`완료 ${pendings.length}`}
        color="green"
        size="middle"
        onClick={handleClickFinish}
      />
      {showSelect && (
        <div className={styles.select}>
          <Button
            value="전송"
            color="blue"
            size="short"
            onClick={handleClickSending}
          />
          <Button
            value="취소"
            color="magenta"
            size="short"
            onClick={handleClickCancel}
          />
        </div>
      )}
    </header>
  );
};

export default memo(FeedbackViewerHeader);
