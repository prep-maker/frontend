import React, { memo, useState } from 'react';

import { Paragraph } from '../../../blocks/blocksSlice';
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.index}>{index + 1}</div>
      <div className={styles.content}>
        <p className={styles.p} onClick={handlePClick}>
          {paragraph.content}
        </p>
        <CommentEditor show={isCommenting} index={index} blockId={blockId} />
        <Comment author="익명" content="테스트" show={isCommenting} isPending />
      </div>
    </div>
  );
};

export default memo(CommentableParagraph);
