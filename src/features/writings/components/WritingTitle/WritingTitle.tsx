import React from 'react';
import SwitchableInput from '../../../../common/components/SwitchableInput/SwitchableInput';
import useInput from '../../../../common/hooks/useInput';
import { validateTitle } from '../../../../common/utils/validators';
import useCurrentWriting from '../../hooks/useCurrentWriting';
import styles from './WritingTitle.module.css';

const WritingTitle = () => {
  const title = useCurrentWriting().title;
  const [value, isValid, onChange] = useInput(title, validateTitle);
  const handleEnter = () => {
    if (!isValid) {
      return;
    }
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

export default WritingTitle;
