import React, { memo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppSelector } from '../../../../common/hooks/useRedux';

import CommentLayout from '../CommentLayout/CommentLayout';
import styles from './Comment.module.css';

type CommentProps = {
  author: string;
  username: string;
  content: string;
  isPending: boolean;
  show: boolean;
  onDelete: (content: string) => void;
};

const Comment = ({
  author,
  username,
  content,
  isPending,
  show,
  onDelete,
}: CommentProps) => {
  const userId = useAppSelector(({ user }) => user.id);
  const isAuthor = userId === author;
  return (
    <>
      {show && (
        <CommentLayout>
          <header className={styles.header}>
            <div className={styles.column}>
              <span className={styles.username}>{username}</span>
              {isPending && <div className={styles.pending}>PENDING</div>}
            </div>
            {!isPending && isAuthor && (
              <button onClick={() => onDelete(content)}>
                <AiOutlineClose title="delete comment" />
              </button>
            )}
          </header>
          <p className={styles.p}>{content}</p>
        </CommentLayout>
      )}
    </>
  );
};

export default memo(Comment);
