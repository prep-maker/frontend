import React from 'react';
import styles from './Input.module.css';

export type InputProps = {
  type: 'email' | 'text' | 'password';
  name: string;
  value: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  fontSize?: 'large' | 'regular' | 'small';
  onChange: React.FormEventHandler;
};

const Input = ({
  type,
  name,
  value,
  placeholder = '',
  minLength = 0,
  maxLength = Number.MAX_SAFE_INTEGER,
  required = false,
  fontSize = 'small',
  onChange,
}: InputProps) => {
  return (
    <input
      className={`${styles.input} ${styles[fontSize]}`}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      onChange={onChange}
    />
  );
};

export default Input;
