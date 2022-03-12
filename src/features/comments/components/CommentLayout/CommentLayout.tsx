import React from 'react';

import styles from './CommentLayout.module.css';

const CommentLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default CommentLayout;
