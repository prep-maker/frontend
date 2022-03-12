import React, { FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import SwitchableInput from '../../../../common/components/SwitchableInput/SwitchableInput';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { saveBlocks } from '../../../blocks/actions';
import { updateParagraph } from '../../../blocks/blocksSlice';
import useBlocksByWritingId from '../../../blocks/hooks/useBlocksByWritingId';
import styles from './ParagraphEditor.module.css';

type ParagraphEditorProp = {
  blockId: string;
  index: number;
};

const ParagraphEditor = ({ blockId, index }: ParagraphEditorProp) => {
  const dispatch = useAppDispatch();
  const content = useAppSelector(
    ({ blocks }) => blocks.byId[blockId].paragraphs[index].content
  );

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    dispatch(updateParagraph({ blockId, index, value: e.currentTarget.value }));
  };

  const { writingId } = useParams<WritingIdParam>() as WritingIdParam;
  const blocks = useBlocksByWritingId(writingId);

  const handleEnter = () => {
    dispatch(updateParagraph({ blockId, index, value: content }));
    dispatch(saveBlocks({ writingId, blocks }));
  };

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
