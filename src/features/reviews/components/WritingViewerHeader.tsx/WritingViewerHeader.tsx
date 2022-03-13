import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../../common/components/Button/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import Modal from '../../../../common/components/Modal/Modal';
import { deleteWriting } from '../../../writings/actions';
import useParagraphsByWritingId from '../../hooks/useParagraphsByWritingId';
import Share from '../Share/Share';
import styles from './WritingViewerHeader.module.css';

const WritingViewerHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { writingId } = useParams<WritingIdParam>() as WritingIdParam;
  const userId = useAppSelector(({ user }) => user.id);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteWriting({ userId, writingId }));
    navigate('/review');
  };

  const paragraphs = useParagraphsByWritingId(writingId);
  const text = paragraphs.map((paragraph) => paragraph.content).join('\n');

  const handleClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <Share onClick={handleModalClose} />
        </Modal>
      )}
      <header className={styles.wrapper}>
        <Button
          value="삭제"
          color="magenta"
          size="short"
          onClick={handleDelete}
        />
        <div className={styles.column}>
          <Button
            value="공유"
            color="yellow"
            size="short"
            onClick={() => setShowModal(true)}
          />
          <Button
            value="복사"
            color="green"
            size="short"
            onClick={handleClick}
          />
        </div>
      </header>
    </>
  );
};

export default WritingViewerHeader;
