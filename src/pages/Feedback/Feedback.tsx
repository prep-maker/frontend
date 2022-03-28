import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Header from '../../common/components/Header/Header';
import Loading from '../../common/components/Loading/Loading';
import { useAppSelector } from '../../common/hooks/useRedux';
import FeedbackViewer from '../../features/comments/components/FeedbackViewer/FeedbackViewer';
import { fetchWritingById } from '../../features/writings/actions';

const Feedback = () => {
  const { writingId } = useParams<keyof WritingIdParam>() as WritingIdParam;
  const writing = useAppSelector(({ writings }) => writings.byId[writingId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWritingById(writingId));
  }, []);

  return (
    <>
      {writing ? (
        <div>
          <Header isLoggedIn={false} />
          <FeedbackViewer writing={writing} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Feedback;
