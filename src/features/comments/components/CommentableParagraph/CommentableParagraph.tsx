import React, { memo, useState } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';

import styles from './CommentableParagraph.module.css';

type CommentableParagraphProps = {
  content: string;
  index: number;
};

const CommentableParagraph = ({
  content,
  index,
}: CommentableParagraphProps) => {
  const [isCommenting, setIsCommneting] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.index}>{index + 1}</div>
      <div className={styles.content}>
        <p className={styles.p}>{content}</p>
        <CommentEditor />
      </div>
    </div>
  );
};

export default memo(CommentableParagraph);
