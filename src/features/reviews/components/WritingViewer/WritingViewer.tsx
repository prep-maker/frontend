import React from 'react';
import { useParams } from 'react-router-dom';
import ViewerLayout from '../../../../common/components/ViewerLayout/ViewerLayout';

import { useAppSelector } from '../../../../common/hooks/useRedux';
import useParagraphsByWritingId from '../../hooks/useParagraphsByWritingId';
import ParagraphEditor from '../ParagraphEditor/ParagraphEditor';
import WritingViewerHeader from '../WritingViewerHeader.tsx/WritingViewerHeader';

const WritingViewer = () => {
  const { writingId } = useParams<WritingIdParam>() as WritingIdParam;
  const writing = useAppSelector(({ writings }) => writings.byId[writingId]);
  const blockId = writing.blocks[0];
  const paragraphs = useParagraphsByWritingId(writingId);

  return (
    <>
      <WritingViewerHeader />
      <ViewerLayout>
        {paragraphs.map((_, i) => (
          <ParagraphEditor key={i} blockId={blockId} index={i} />
        ))}
      </ViewerLayout>
    </>
  );
};

export default WritingViewer;
