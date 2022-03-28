import React, { FormEvent, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import SwitchableInput from '../../../../common/components/SwitchableInput/SwitchableInput';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { updateBlock } from '../../../blocks/actions';
import { updateParagraph } from '../../../blocks/blocksSlice';
import styles from './ParagraphEditor.module.css';

type ParagraphEditorProp = {
  blockId: string;
  index: number;
  content: string;
};

const ParagraphEditor = ({ blockId, index, content }: ParagraphEditorProp) => {
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      dispatch(
        updateParagraph({ blockId, index, value: e.currentTarget.value })
      );
    },
    [blockId, index]
  );

  const { writingId } = useParams<keyof WritingIdParam>() as WritingIdParam;
  const block = useAppSelector(({ blocks }) => blocks.byId[blockId]);

  const handleEnter = useCallback(() => {
    dispatch(updateBlock({ writingId, blockId, block }));
  }, [writingId, blockId, block]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.index}>{index + 1}</div>
      <SwitchableInput
        value={content}
        onChange={handleChange}
        onEnter={handleEnter}
        focusLine
      />
    </div>
  );
};

export default ParagraphEditor;
