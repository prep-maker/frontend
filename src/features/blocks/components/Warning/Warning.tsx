import React from 'react';

import styles from './Warning.module.css';

const Warning = ({ message = ' ' }: { message?: string }) => {
  return <div className={styles.warning}>{message}</div>;
};

export default Warning;
