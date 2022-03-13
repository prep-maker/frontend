import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import CommentLayout from '../CommentLayout/CommentLayout';
import styles from './Comment.module.css';

type CommentProps = {
  author: string;
  content: string;
  isPending: boolean;
  show: boolean;
  onDelete: (content: string) => void;
};

const Comment = ({
  author,
  content,
  isPending,
  show,
  onDelete,
}: CommentProps) => {
  return (
    <>
      {show && (
        <CommentLayout>
          <header className={styles.header}>
            <div className={styles.column}>
              <span className={styles.author}>{author}</span>
              {isPending && <div className={styles.pending}>PENDING</div>}
            </div>
            <button onClick={() => onDelete(content)}>
              <AiOutlineClose />
            </button>
          </header>
          <p className={styles.p}>{content}</p>
        </CommentLayout>
      )}
    </>
  );
};

export default Comment;
