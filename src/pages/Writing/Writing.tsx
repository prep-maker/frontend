import React, { useEffect } from 'react';
import WritingList from '../../features/writings/components/WritingList/WritingList';
import Header from '../../common/components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../common/hooks/useRedux';
import useWritings from '../../features/writings/hooks/useWritings';
import { fetchEditingByUserId } from '../../features/writings/actions';
import styles from './Writing.module.css';
import WritingSkeleton from './WritingSkeleton';
import WritingTitle from '../../features/writings/components/WritingTitle/WritingTitle';
import WritingFooter from '../../features/writings/components/WritingFooter/WritingFooter';
import BlockEditor from '../../features/blocks/components/BlockEditor/BlockEditor';

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
          <WritingList />
          <section className={styles.writing}>
            <WritingTitle />
            <BlockEditor />
            <WritingFooter />
          </section>
        </main>
      )}
    </>
  );
};

export default Writing;
