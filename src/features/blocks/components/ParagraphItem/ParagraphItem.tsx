import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';

import { useAppDispatch } from '../../../../common/hooks/useRedux';
import { Paragraph, updateParagraph } from '../../blocksSlice';
import styles from './ParagraphItem.module.css';
import useCorrection from '../../hooks/useCorrection';

const cx = classNames.bind(styles);

type ParagraphItemProps = Paragraph & {
  index: number;
  blockId: string;
  onWarning: (value: string) => void;
};

const ParagraphItem = ({
  type,
  content,
  index,
  blockId,
  onWarning,
}: ParagraphItemProps) => {
  const [isFolded, setIsFolded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  useCorrection({ type, value: content, callback: onWarning });

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
    dispatch(updateParagraph({ blockId, index, value: e.currentTarget.value }));
  };

  const color = type === 'P' ? 'pink' : type === 'R' ? 'green' : 'yellow';

  return (
    <>
      {isFolded ? (
        <div className={cx(color, 'header', 'folded')}>
          <span className={styles.summary}>{content}</span>
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
            value={content}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
};

const heightenByScroll = (element: HTMLTextAreaElement) => {
  const MIN_HEIGHT = '16px';
  element.style.height = MIN_HEIGHT;
  element.style.height = element.scrollHeight + 'px';
};

export default ParagraphItem;
