import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../common/hooks/useRedux';
import useParagraphsByWritingId from '../../hooks/useParagraphsByWritingId';
import ParagraphEditor from '../ParagraphEditor/ParagraphEditor';
import WritingViewerHeader from '../WritingViewerHeader.tsx/WritingViewerHeader';
import styles from './WritingViewer.module.css';

const WritingViewer = () => {
  const { writingId } = useParams();
  const blockId = useAppSelector(
    ({ writings }) => writings.byId[writingId as string].blocks[0]
  );
  const paragraphs = useParagraphsByWritingId(writingId as string);

  return (
    <>
      <WritingViewerHeader />
      <div className={styles.wrapper}>
        <div className={styles.index} />
        <div className={styles.paragraphs}>
          {paragraphs.map((_, i) => (
            <ParagraphEditor key={i} blockId={blockId} index={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WritingViewer;
