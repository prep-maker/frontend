import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  value: string;
  color: 'pink' | 'yellow' | 'green' | 'blue';
  size: 'atom' | 'short' | 'middle' | 'long';
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button = ({
  value,
  color,
  size,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[color]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
