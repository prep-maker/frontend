import React from 'react';

import styles from './CommentableParagraph.module.css';

type CommentableParagraphProps = {
  content: string;
  index: number;
};

const CommentableParagraph = ({
  content,
  index,
}: CommentableParagraphProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.index}>{index + 1}</div>
      <p className={styles.p}>{content}</p>
    </div>
  );
};

export default CommentableParagraph;
