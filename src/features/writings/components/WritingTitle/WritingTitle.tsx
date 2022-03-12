import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import SwitchableInput from '../../../../common/components/SwitchableInput/SwitchableInput';
import useInput from '../../../../common/hooks/useInput';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { validateTitle } from '../../../../common/utils/validators';
import { updateWriting } from '../../actions';
import { Writing } from '../../writingsSlice';
import styles from './WritingTitle.module.css';

const WritingTitle = () => {
  const dispatch = useAppDispatch();
  const { writingId } = useParams<WritingIdParam>() as WritingIdParam;
  const writing = useAppSelector(({ writings }) => writings.byId[writingId]);
  const userId = useAppSelector(({ user }) => user.id);
  const [value, isValid, onChange] = useInput(writing?.title, validateTitle);

  const handleEnter = () => {
    if (!(isValid && writing)) {
      return;
    }

    const updated: Omit<Writing, 'blocks'> = {
      id: writing.id,
      title: value,
      author: userId,
      isDone: writing.isDone,
    };
    dispatch(updateWriting(updated));
  };

  return (
    <div className={styles.wrapper}>
      <SwitchableInput
        value={value}
        onChange={onChange}
        onEnter={handleEnter}
        focusLine
      />
    </div>
  );
};

export default memo(WritingTitle);
