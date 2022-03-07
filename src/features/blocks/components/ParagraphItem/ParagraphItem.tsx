import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';

import useInput from '../../../../common/hooks/useInput';
import { Paragraph, updateParagraph } from '../../blocksSlice';
import styles from './ParagraphItem.module.css';
import { useAppDispatch } from '../../../../common/hooks/useRedux';

const cx = classNames.bind(styles);

const ParagraphItem = ({ type, content }: Paragraph) => {
  const [isFolded, setIsFolded] = useState(false);
  const [value, isValid, onChange] = useInput(content, () => true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    onChange(e);

    if (!textareaRef.current) {
      return;
    }

    const MIN_HEIGHT = '16px';
    textareaRef.current.style.height = MIN_HEIGHT;
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    dispatch(updateParagraph({ blockId, index, value: e.currentTarget.value }));
  };

  const color = type === 'P' ? 'pink' : type === 'R' ? 'green' : 'yellow';

  return (
    <>
      {isFolded ? (
        <div className={cx(color, 'header', 'folded')}>
          <span className={styles.summary}>{value}</span>
          <button
            className={styles.button}
            onClick={() => setIsFolded((prev) => !prev)}
          >
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      ) : (
        <div className={cx(color, 'wrapper')}>
          <header className={cx(color, 'header')}>
            <button
              className={styles.button}
              onClick={() => setIsFolded((prev) => !prev)}
            >
              <MdKeyboardArrowDown size={20} />
            </button>
          </header>
          <textarea
            className={styles.text}
            ref={textareaRef}
            value={value}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
};

export default ParagraphItem;
