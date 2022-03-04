import React from 'react';
import Button from '../../../../common/components/Button/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import styles from './WritingFooter.module.css';
import useCurrentWriting from '../../hooks/useCurrentWriting';
import { deleteWriting, updateWriting } from '../../actions';

const WritingFooter = () => {
  const dispatch = useAppDispatch();
  const writing = useCurrentWriting();
  const userId = useAppSelector(({ user }) => user.id);

  const handleDelete = () => {
    dispatch(deleteWriting({ userId, writingId: writing.id }));
  };

  const finished = {
    id: writing.id,
    title: writing.title,
    isDone: true,
  };
  const handleFinish = () => {
    dispatch(updateWriting({ userId, writing: finished }));
  };
  const handleSave = () => {};
  return (
    <div className={styles.wrapper}>
      <Button
        value="삭제"
        color="magenta"
        size="short"
        onClick={handleDelete}
      />
      <div className={styles.column}>
        <div className={styles.middle}>
          <Button
            value="완료"
            color="yellow"
            size="short"
            onClick={handleFinish}
          />
        </div>
        <Button value="저장" color="blue" size="short" onClick={() => {}} />
      </div>
    </div>
  );
};

export default WritingFooter;
