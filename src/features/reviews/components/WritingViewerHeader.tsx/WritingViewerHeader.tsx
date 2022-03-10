import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../../common/components/Button/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { deleteWriting } from '../../../writings/actions';
import useParagraphsByWritingId from '../../hooks/useParagraphsByWritingId';
import styles from './WritingViewerHeader.module.css';

const WritingViewerHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { writingId } = useParams();
  const userId = useAppSelector(({ user }) => user.id);

  const handleDelete = () => {
    dispatch(deleteWriting({ userId, writingId: writingId as string }));
    navigate('/review');
  };

  const paragraphs = useParagraphsByWritingId(writingId as string);
  const text = paragraphs.join('\n');

  const handleClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <header className={styles.wrapper}>
      <Button
        value="삭제"
        color="magenta"
        size="short"
        onClick={handleDelete}
      />
      <div className={styles.button}>
        <Button
          value="클립보드 복사"
          color="green"
          size="full"
          onClick={handleClick}
        />
      </div>
    </header>
  );
};

export default WritingViewerHeader;
