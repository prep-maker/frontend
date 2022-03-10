import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';

import Textarea from '../../../../common/components/Textarea/Textarea';
import { useAppDispatch } from '../../../../common/hooks/useRedux';
import { Paragraph, updateParagraph } from '../../blocksSlice';
import useCorrection from '../../hooks/useCorrection';
import styles from './ParagraphItem.module.css';

const cx = classNames.bind(styles);

type ParagraphItemProps = Omit<Paragraph, 'comments'> & {
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
  const dispatch = useAppDispatch();

  useCorrection({ type, value: content, callback: onWarning });

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
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
          <Textarea value={content} onChange={handleChange} />
        </div>
      )}
    </>
  );
};

export default ParagraphItem;
