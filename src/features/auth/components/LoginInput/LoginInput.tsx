import React from 'react';
import styles from './LoginInput.module.css';
import Input, { InputProps } from '../../../../common/components/Input/Input';

type LoignInputProps = Omit<InputProps, 'fontSize'>;

const LoginInput = ({ value, placeholder, onChange }: LoignInputProps) => {
  return (
    <div className={styles.wrapper}>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        fontSize="regular"
      />
    </div>
  );
};

export default LoginInput;
