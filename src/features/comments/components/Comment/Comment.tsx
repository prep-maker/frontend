import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import CommentLayout from '../CommentLayout/CommentLayout';
import styles from './Comment.module.css';

type CommentProps = {
  author: string;
  content: string;
  isPending: boolean;
  show: boolean;
};

const Comment = ({ author, content, isPending, show }: CommentProps) => {
  return (
    <>
      {show && (
        <CommentLayout>
          <header className={styles.header}>
            <div className={styles.column}>
              <span className={styles.author}>{author}</span>
              {isPending && <div className={styles.pending}>PENDING</div>}
            </div>
            <button>
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
