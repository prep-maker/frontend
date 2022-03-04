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
            <div className={styles.buttons}>
              <Button
                value="삭제"
                color="magenta"
                size="short"
                onClick={() => {}}
              />
              <div className={styles.row}>
                <Button
                  value="완료"
                  color="yellow"
                  size="short"
                  onClick={() => {}}
                />
                <Button
                  value="저장"
                  color="blue"
                  size="short"
                  onClick={() => {}}
                />
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Writing;
