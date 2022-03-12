import React from 'react';

import Button from '../../../../common/components/Button/Button';
import Textarea from '../../../../common/components/Textarea/Textarea';
import useInput from '../../../../common/hooks/useInput';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { addCommentToParagraph } from '../../../blocks/blocksSlice';
import CommentLayout from '../CommentLayout/CommentLayout';
import styles from './CommentEditor.module.css';

type CommentEditorProps = {
  show: boolean;
  index: number;
  blockId: string;
};

const CommentEditor = ({ show, index, blockId }: CommentEditorProps) => {
  const [value, isValid, handleChange, reset] = useInput('', () => true);
  const user = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();

  const addComment = () => {
    dispatch(
      addCommentToParagraph({
        blockId,
        content: value,
        author: user.id,
        username: user.name,
        pIndex: index,
      })
    );
    reset();
  };

  const handleClick = () => {
    addComment();
  };

  return (
    <>
      {show && (
        <CommentLayout>
          <div className={styles.input}>
            <Textarea value={value} onChange={handleChange} />
          </div>
          <footer className={styles.footer}>
            <div className={styles.button}>
              <Button
                value="작성"
                color="yellow"
                size="full"
                onClick={handleClick}
              />
            </div>
          </footer>
        </CommentLayout>
      )}
    </>
  );
};

export default CommentEditor;
