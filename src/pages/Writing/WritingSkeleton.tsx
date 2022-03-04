import React from 'react';
import styles from './Writing.module.css';
import { WritingListSkeleton } from '../../features/writings/components/WritingList/WritingList';

const WritingSkeleton = () => {
  return (
    <main className={styles.main}>
      <WritingListSkeleton />
    </main>
  );
};

export default WritingSkeleton;
