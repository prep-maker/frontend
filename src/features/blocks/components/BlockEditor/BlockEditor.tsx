import React, { memo } from 'react';

import BlockEditorHeader from '../BlcokEditorHeader/BlockEditorHeader';
import BlockList from '../BlockList/BlockList';
import styles from './BlockEditor.module.css';

const BlockEditor = () => {
  return (
    <section className={styles.wrapper}>
      <BlockEditorHeader />
      <BlockList />
    </section>
  );
};

export default memo(BlockEditor);
