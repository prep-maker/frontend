import React from 'react';
import styles from './Input.module.css';

export type InputProps = {
  value: string;
  placeholder?: string;
  fontSize?: 'large' | 'regular' | 'small';
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = ({
  value,
  placeholder = '',
  fontSize = 'small',
  onChange,
}: InputProps) => {
  return (
    <input
      className={`${styles.input} ${styles[fontSize]}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
