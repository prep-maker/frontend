import React from 'react';

import Header from '../../common/components/Header/Header';
import WritingTitle from '../../features/writings/components/WritingTitle/WritingTitle';
import { useAppSelector } from '../../common/hooks/useRedux';
import WritingMenu, {
  WritingMenuSkeleton,
} from '../../features/writings/components/WritingMenu/WritingMenu';
import styles from './Main.module.css';

const Main = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAppSelector(({ ui }) => ui.loading) === 'pending';
  const writings = useAppSelector(({ writings }) => writings.allIds);

  return (
    <>
      <Header isLoggedIn={true} />
      {isLoading && !writings?.length ? (
        <MainSkeleton />
      ) : (
        <main className={styles.main}>
          <WritingMenu />
          <section className={styles.writing}>
            <WritingTitle />
            {children}
          </section>
        </main>
      )}
    </>
  );
};

export const MainSkeleton = () => {
  return (
    <main className={styles.main}>
      <WritingMenuSkeleton />
    </main>
  );
};

export default Main;
