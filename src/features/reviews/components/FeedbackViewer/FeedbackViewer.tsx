import React from 'react';

import ViewerLayout from '../../../../common/components/ViewerLayout/ViewerLayout';
import CommentableParagraph from '../../../comments/components/CommentableParagraph/CommentableParagraph';
import { Writing } from '../../../writings/writingsSlice';
import useParagraphsByWritingId from '../../hooks/useParagraphsByWritingId';
import FeedbackViewerHeader from '../FeedbackViewerHeader/FeedbackViewerHeader';
import styles from './FeedbackViewer.module.css';

const FeedbackViewer = ({ writing }: { writing: Writing }) => {
  const paragraphs = useParagraphsByWritingId(writing.id);
  const blockId = writing?.blocks[0];
  const comments = paragraphs?.flatMap((paragraph) => paragraph.comments);

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{writing.title}</h1>
        <FeedbackViewerHeader comments={comments} />
        <ViewerLayout>
          {paragraphs?.map((paragraph, i) => (
            <CommentableParagraph
              key={i}
              paragraph={paragraph}
              index={i}
              blockId={blockId}
            />
          ))}
        </ViewerLayout>
      </div>
    </>
  );
};

export default FeedbackViewer;
