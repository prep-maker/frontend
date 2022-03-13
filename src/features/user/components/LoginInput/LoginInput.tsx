import React from 'react';

import Input, { InputProps } from '../../../../common/components/Input/Input';
import styles from './LoginInput.module.css';

type LoignInputProps = Omit<InputProps, 'fontSize'>;

const LoginInput = ({
  type,
  name,
  value,
  placeholder,
  minLength,
  maxLength,
  onChange,
}: LoignInputProps) => {
  return (
    <div className={styles.wrapper}>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={true}
        onChange={onChange}
        fontSize="regular"
      />
    </div>
  );
};

export default LoginInput;
