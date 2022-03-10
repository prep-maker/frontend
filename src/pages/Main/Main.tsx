import React from 'react';

import Header from '../../common/components/Header/Header';
import WritingTitle from '../../features/writings/components/WritingTitle/WritingTitle';
import { useAppSelector } from '../../common/hooks/useRedux';
import WritingMenu from '../../features/writings/components/WritingMenu/WritingMenu';
import MainSkeleton from './MainSkeleton';
import styles from './Main.module.css';

const Main = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAppSelector(({ ui }) => ui.loading) === 'pending';

  return (
    <>
      <Header isLoggedIn={true} />
      {isLoading ? (
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

export default Main;
