import React, { useState } from 'react';

import Button from '../../../../common/components/Button/Button';
import styles from './FeedbackViewerHeader.module.css';

const FeedbackViewerHeader = () => {
  const [showSelect, setShowSelect] = useState(false);

  const handleClickFinish = () => {
    setShowSelect((prev) => !prev);
  };

  return (
    <header className={styles.wrapper}>
      <Button
        value="코멘트 완료"
        color="green"
        size="middle"
        onClick={handleClickFinish}
      />
      {showSelect && (
        <div className={styles.select}>
          <Button value="전송" color="blue" size="short" onClick={() => {}} />
          <Button
            value="취소"
            color="magenta"
            size="short"
            onClick={() => {}}
          />
        </div>
      )}
    </header>
  );
};

export default FeedbackViewerHeader;
