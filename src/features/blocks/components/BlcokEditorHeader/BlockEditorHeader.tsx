import React, { memo } from 'react';

import Button from '../../../../common/components/Button/Button';
import styles from './BlockEditorHeader.module.css';

const BlockEditorHeader = () => {
  return (
    <header className={styles.wrapper}>
      <Button color="blue" value="PREP" size="middle" onClick={() => {}} />
      <Button color="pink" value="P" size="atom" onClick={() => {}} />
      <Button color="green" value="R" size="atom" onClick={() => {}} />
      <Button color="yellow" value="E" size="atom" onClick={() => {}} />
    </header>
  );
};

export default memo(BlockEditorHeader);
