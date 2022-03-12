import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ViewerLayout from '../../../../common/components/ViewerLayout/ViewerLayout';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';

import CommentableParagraph from '../../../comments/components/CommentableParagraph/CommentableParagraph';
import { fetchWritingById } from '../../../writings/actions';
import useParagraphsByWritingId from '../../hooks/useParagraphsByWritingId';
import FeedbackViewerHeader from '../FeedbackViewerHeader/FeedbackViewerHeader';
import styles from './FeedbackViewer.module.css';

const ParagraphViewer = () => {
  const { writingId } = useParams<keyof WritingIdParam>() as WritingIdParam;
  const writing = useAppSelector(({ writings }) => writings.byId[writingId]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!writing) {
      dispatch(fetchWritingById(writingId));
    }
  }, [writing]);

  const paragraphs = useParagraphsByWritingId(writingId);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{writing.title}</h1>
      <FeedbackViewerHeader />
      <ViewerLayout>
        {paragraphs?.map((paragraph, i) => (
          <CommentableParagraph key={i} content={paragraph} index={i} />
        ))}
      </ViewerLayout>
    </div>
  );
};

export default ParagraphViewer;
