import React from 'react';

import styles from './ViewerLayout.module.css';

const ViewerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.index} />
      <div className={styles.paragraphs}>{children}</div>
    </div>
  );
};

export default ViewerLayout;
