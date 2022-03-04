import React, { KeyboardEvent, useState } from 'react';
import styles from './SwitchableInput.module.css';

type SwitchableInputProps = {
  value: string;
  name: string;
  onChange: React.FormEventHandler;
  onEnter: React.KeyboardEventHandler;
};

const SwitchableInput = ({
  value,
  name,
  onChange,
  onEnter,
}: SwitchableInputProps) => {
  const [isInput, setIsInput] = useState(false);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(e);

      if (!e.currentTarget.value) {
        return;
      }

      setIsInput(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isInput ? (
        <input
          name={name}
          value={value}
          onKeyUp={handleKeyUp}
          onChange={onChange}
          className={`${styles.wrapper} ${styles.input}`}
        />
      ) : (
        <div
          onClick={() => {
            setIsInput(true);
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default SwitchableInput;
