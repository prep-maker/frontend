import React, { memo, useCallback } from 'react';

import Button from '../../../../common/components/Button/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import useCurrentWriting from '../../../writings/hooks/useCurrentWriting';
import { ParagraphType } from '../../types';
import { createBlock } from '../../actions';
import styles from './BlockEditorHeader.module.css';

const BlockEditorHeader = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);
  const writingId = useCurrentWriting()?.id;

  const handleClick = useCallback(
    (types: ParagraphType[]) =>
      dispatch(createBlock({ userId, writingId, types })),
    [userId, writingId]
  );

  return (
    <header className={styles.wrapper}>
      <Button
        color="blue"
        value="PREP"
        size="middle"
        onClick={() => handleClick(['P', 'R', 'E', 'P'])}
      />
      <Button
        color="pink"
        value="P"
        size="atom"
        onClick={() => handleClick(['P'])}
      />
      <Button
        color="green"
        value="R"
        size="atom"
        onClick={() => handleClick(['R'])}
      />
      <Button
        color="yellow"
        value="E"
        size="atom"
        onClick={() => handleClick(['E'])}
      />
    </header>
  );
};

export default memo(BlockEditorHeader);
