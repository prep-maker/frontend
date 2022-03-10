import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';

import styles from './Textarea.module.css';

const cx = classNames.bind(styles);

type TextareaProps = {
  value: string;
  onChange: React.FormEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  focusLine?: boolean;
};

const Textarea = ({
  value,
  onChange,
  onKeyDown,
  focusLine = false,
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    heightenByScroll(textareaRef.current);
  }, [textareaRef.current]);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) {
      return;
    }

    heightenByScroll(textareaRef.current);
    onChange(e);
  };

  return (
    <textarea
      ref={textareaRef}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      className={cx('text', { focusLine })}
      value={value}
    />
  );
};

export default Textarea;

const heightenByScroll = (element: HTMLTextAreaElement) => {
  const MIN_HEIGHT = '16px';
  element.style.height = MIN_HEIGHT;
  element.style.height = element.scrollHeight + 'px';
};
