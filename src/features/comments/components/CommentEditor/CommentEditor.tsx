import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import Button from '../../../../common/components/Button/Button';
import Textarea from '../../../../common/components/Textarea/Textarea';
import useInput from '../../../../common/hooks/useInput';
import styles from './CommentEditor.module.css';

const CommentEditor = () => {
  const [value, isValid, handleChange] = useInput('', () => true);

  return (
    <div className={styles.wrapper}>
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
          <Button value="작성" color="yellow" size="full" onClick={() => {}} />
        </div>
      </footer>
    </div>
  );
};

export default CommentEditor;
