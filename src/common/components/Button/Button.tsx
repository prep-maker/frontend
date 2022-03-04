import React, { memo, ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.css';

type ButtonProps = {
  value: string | ReactElement;
  color: 'pink' | 'yellow' | 'green' | 'blue' | 'white' | 'gray' | 'magenta';
  size: 'atom' | 'short' | 'middle' | 'long' | 'full';
  circle?: boolean;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  border?: boolean;
};

const cn = classNames.bind(styles);

const Button = ({
  value,
  color,
  size,
  circle = false,
  onClick,
  disabled = false,
  border = true,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'button',
        color,
        size,
        { circle },
        { 'no-border': !border }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

type ButtonSkeletonProps = {
  size: 'atom' | 'short' | 'middle' | 'long' | 'full';
  circle?: boolean;
};

export const ButtonSkeleton = ({
  size,
  circle = false,
}: ButtonSkeletonProps) => {
  return (
    <Button
      value=""
      color="gray"
      size={size}
      circle={circle}
      onClick={() => {}}
      disabled={true}
      border={false}
    />
  );
};

export default memo(Button);
