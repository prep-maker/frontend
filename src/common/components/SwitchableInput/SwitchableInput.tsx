import React, { KeyboardEvent, memo, useCallback, useState } from 'react';

import Textarea from '../Textarea/Textarea';
import styles from './SwitchableInput.module.css';

type SwitchableInputProps = {
  value: string;
  onChange: React.FormEventHandler;
  onEnter: React.KeyboardEventHandler;
  focusLine?: boolean;
};

const SwitchableInput = ({
  value,
  onChange,
  onEnter,
  focusLine = false,
}: SwitchableInputProps) => {
  const [isInput, setIsInput] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        onEnter(e);

        if (!e.currentTarget.value) {
          return;
        }

        setIsInput(false);
      }
    },
    [onEnter]
  );

  return (
    <div className={styles.wrapper}>
      {isInput ? (
        <Textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          focusLine={focusLine}
        />
      ) : (
        <div
          onClick={() => {
            setIsInput(true);
          }}
          className={styles.text}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default memo(SwitchableInput);
