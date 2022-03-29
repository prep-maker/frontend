import React, { memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../../common/components/Button/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import Modal from '../../../../common/components/Modal/Modal';
import { deleteWriting } from '../../../writings/actions';
import Share from '../Share/Share';
import styles from './WritingViewerHeader.module.css';

const WritingViewerHeader = ({ content }: { content: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { writingId } = useParams<WritingIdParam>() as WritingIdParam;
  const userId = useAppSelector(({ user }) => user.id);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(deleteWriting({ userId, writingId }));
    navigate('/review');
  }, [userId, writingId]);

  const handleClickCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
  }, [content]);

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
            onClick={handleClickCopy}
          />
        </div>
      </header>
    </>
  );
};

export default memo(WritingViewerHeader);
