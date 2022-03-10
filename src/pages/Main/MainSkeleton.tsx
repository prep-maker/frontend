import React from 'react';
import styles from './Main.module.css';

import { WritingMenuSkeleton } from '../../features/writings/components/WritingMenu/WritingMenu';

const MainSkeleton = () => {
  return (
    <main className={styles.main}>
      <WritingMenuSkeleton />
    </main>
  );
};

export default MainSkeleton;
