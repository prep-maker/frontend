import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import Button from '../../../../common/components/Button/Button';
import Textarea from '../../../../common/components/Textarea/Textarea';
import useInput from '../../../../common/hooks/useInput';
import CommentLayout from '../CommentLayout/CommentLayout';
import styles from './CommentEditor.module.css';

const CommentEditor = ({ show }: { show: boolean }) => {
  const [value, isValid, handleChange] = useInput('', () => true);

  return (
    <>
      {show && (
        <CommentLayout>
          <header className={styles.header}>
            <button>
              <AiOutlineClose />
            </button>
          </header>
          <div className={styles.input}>
            <Textarea value={value} onChange={handleChange} />
          </div>
          <footer className={styles.footer}>
            <div className={styles.button}>
              <Button
                value="작성"
                color="yellow"
                size="full"
                onClick={() => {}}
              />
            </div>
          </footer>
        </CommentLayout>
      )}
    </>
  );
};

export default CommentEditor;
