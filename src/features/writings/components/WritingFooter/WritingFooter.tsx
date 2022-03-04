import React from 'react';
import Button from '../../../../common/components/Button/Button';
import styles from './WritingFooter.module.css';

const WritingFooter = () => {
  const handleDelete = () => {};
  const handleFinish = () => {};
  const handleSave = () => {};
  return (
    <div className={styles.wrapper}>
      <Button value="삭제" color="magenta" size="short" onClick={() => {}} />
      <div className={styles.column}>
        <div className={styles.middle}>
          <Button value="완료" color="yellow" size="short" onClick={() => {}} />
        </div>
        <Button value="저장" color="blue" size="short" onClick={() => {}} />
      </div>
    </div>
  );
};

export default WritingFooter;
