import React, { memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { updateBlock } from '../../../blocks/actions';
import { Block, Paragraph } from '../../../blocks/blocksSlice';
import Comment from '../Comment/Comment';
import CommentEditor from '../CommentEditor/CommentEditor';
import styles from './CommentableParagraph.module.css';

type CommentableParagraphProps = {
  paragraph: Paragraph;
  index: number;
  blockId: string;
};

const CommentableParagraph = ({
  paragraph,
  index,
  blockId,
}: CommentableParagraphProps) => {
  const [isCommenting, setIsCommneting] = useState(false);
  const handlePClick = () => {
    setIsCommneting((prev) => !prev);
  };

  const dispatch = useAppDispatch();
  const { writingId } = useParams<keyof WritingIdParam>() as WritingIdParam;
  const block = useAppSelector(({ blocks }) => blocks.byId[blockId]);

  const handleDelete = useCallback(
    (content: string) => {
      const deleted = paragraph.comments.filter(
        (comment) => comment.content !== content
      );
      const copy: Block = JSON.parse(JSON.stringify(block));
      copy.paragraphs[index].comments = deleted;

      dispatch(updateBlock({ writingId, blockId, block: copy }));
    },
    [paragraph, block]
  );

  return (
    <div className={styles.wrapper}>
      {!!paragraph.comments.length && (
        <div className={styles.comments}>{paragraph.comments.length}</div>
      )}
      <div className={styles.index}>{index + 1}</div>
      <div className={styles.content}>
        <p className={styles.p} onClick={handlePClick}>
          {paragraph.content}
        </p>
        <CommentEditor show={isCommenting} index={index} blockId={blockId} />
        {paragraph.comments.map((comment, i) => (
          <Comment
            key={i}
            author={comment.username}
            content={comment.content}
            show={isCommenting}
            isPending={!!comment.isPending}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(CommentableParagraph);
