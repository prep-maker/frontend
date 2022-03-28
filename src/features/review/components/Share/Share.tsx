import React, { MouseEventHandler } from 'react';

import styles from './Share.module.css';

const Share = ({ onClick }: { onClick: MouseEventHandler }) => {
  const url = window.location.href.replace('review', 'feedback');

  const handleClick = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(url);
    onClick(e);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <input className={styles.input} value={url} readOnly />
        <button className={styles.button} onClick={handleClick}>
          링크 복사
        </button>
      </div>
    </div>
  );
};

export default Share;
