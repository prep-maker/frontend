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
  const paragraphs = useParagraphsByWritingId(writing.id);

  const content = paragraphs?.map((paragraph) => paragraph.content).join('\n');

  return (
    <>
      <WritingViewerHeader content={content} />
      <ViewerLayout>
        {paragraphs?.map((paragraph, i) => (
          <ParagraphEditor
            key={i}
            blockId={blockId}
            index={i}
            content={paragraph.content}
          />
        ))}
      </ViewerLayout>
    </>
  );
};

export default WritingViewer;
