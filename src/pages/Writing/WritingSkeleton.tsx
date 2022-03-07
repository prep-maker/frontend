import React from 'react';
import styles from './Writing.module.css';

import { WritingMenuSkeleton } from '../../features/writings/components/WritingMenu/WritingMenu';

const WritingSkeleton = () => {
  return (
    <main className={styles.main}>
      <WritingMenuSkeleton />
    </main>
  );
};

export default WritingSkeleton;
