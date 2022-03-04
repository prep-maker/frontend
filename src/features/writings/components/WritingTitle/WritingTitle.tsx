import React, { memo } from 'react';
import SwitchableInput from '../../../../common/components/SwitchableInput/SwitchableInput';
import useInput from '../../../../common/hooks/useInput';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { validateTitle } from '../../../../common/utils/validators';
import { updateWriting } from '../../actions/thunks';
import useCurrentWriting from '../../hooks/useCurrentWriting';
import { Writing } from '../../writingsSlice';
import styles from './WritingTitle.module.css';

const WritingTitle = () => {
  const dispatch = useAppDispatch();
  const writing: Writing = useCurrentWriting();
  const userId: string = useAppSelector(({ user }) => user.id);
  const [value, isValid, onChange] = useInput(writing?.title, validateTitle);

  const handleEnter = () => {
    if (!(isValid && writing)) {
      return;
    }

    const updated: Omit<Writing, 'blocks'> = {
      id: writing.id,
      title: value,
      isDone: writing.isDone,
    };
    dispatch(updateWriting({ userId, writing: updated }));
  };

  return (
    <div className={styles.wrapper}>
      <SwitchableInput
        name="title"
        value={value}
        onChange={onChange}
        onEnter={handleEnter}
      />
    </div>
  );
};

export default memo(WritingTitle);
