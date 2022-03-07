import React, { useEffect } from 'react';

import Header from '../../common/components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../common/hooks/useRedux';
import useWritings from '../../features/writings/hooks/useWritings';
import { fetchEditingByUserId } from '../../features/writings/actions';
import WritingTitle from '../../features/writings/components/WritingTitle/WritingTitle';
import WritingFooter from '../../features/writings/components/WritingFooter/WritingFooter';
import WritingSkeleton from './WritingSkeleton';
import styles from './Writing.module.css';
import { Outlet } from 'react-router-dom';
import WritingMenu from '../../features/writings/components/WritingMenu/WritingMenu';

const Writing = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);
  const isLoading = useAppSelector(({ ui }) => ui.loading) === 'pending';
  const writings = useWritings();

  useEffect(() => {
    dispatch(fetchEditingByUserId(userId));
  }, [userId]);

  return (
    <>
      <Header isLoggedIn={true} />
      {isLoading && !writings.length ? (
        <WritingSkeleton />
      ) : (
        <main className={styles.main}>
          <WritingMenu />
          <section className={styles.writing}>
            <WritingTitle />
            <Outlet />
            <WritingFooter />
          </section>
        </main>
      )}
    </>
  );
};

export default Writing;
