import React, { useEffect } from 'react';
import WritingList from '../../features/writings/components/WritingList/WritingList';
import Header from '../../common/components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../common/hooks/useRedux';
import useWritings from '../../features/writings/hooks/useWritings';
import { fetchEditingByUserId } from '../../features/writings/actions';
import styles from './Writing.module.css';
import WritingSkeleton from './WritingSkeleton';
import WritingTitle from '../../features/writings/components/WritingTitle/WritingTitle';
import Button from '../../common/components/Button/Button';
import WritingFooter from '../../features/writings/components/WritingFooter/WritingFooter';

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
      <Header />
      {isLoading && !writings.length ? (
        <WritingSkeleton />
      ) : (
        <main className={styles.main}>
          <WritingList writings={writings} />
          <section className={styles.writing}>
            <WritingTitle />
            <div className={styles.editor} />
            <WritingFooter />
          </section>
        </main>
      )}
    </>
  );
};

export default Writing;
