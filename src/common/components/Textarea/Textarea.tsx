import React, { useEffect, useRef } from 'react';

import styles from './Textarea.module.css';

type TextareaProps = {
  value: string;
  onChange: React.FormEventHandler;
};

const Textarea = ({ value, onChange }: TextareaProps) => {
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
    <textarea ref={textareaRef} onChange={handleChange} className={styles.text}>
      {value}
    </textarea>
  );
};

export default Textarea;

const heightenByScroll = (element: HTMLTextAreaElement) => {
  const MIN_HEIGHT = '16px';
  element.style.height = MIN_HEIGHT;
  element.style.height = element.scrollHeight + 'px';
};
