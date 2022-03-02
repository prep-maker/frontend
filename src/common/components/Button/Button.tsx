import React, { memo, ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.css';

type ButtonProps = {
  value: string | ReactElement;
  color: 'pink' | 'yellow' | 'green' | 'blue' | 'transparent';
  size: 'atom' | 'short' | 'middle' | 'long';
  circle?: boolean;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const cn = classNames.bind(styles);

const Button = ({
  value,
  color,
  size,
  circle = false,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={cn('button', color, size, { circle: circle })}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default memo(Button);
