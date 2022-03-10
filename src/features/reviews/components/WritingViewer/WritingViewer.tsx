import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../common/hooks/useRedux';
import useParagraphsByWritingId from '../../hooks/useParagraphsByWritingId';
import ParagraphEditor from '../ParagraphEditor/ParagraphEditor';

const WritingViewer = () => {
  const { writingId } = useParams();
  const blockId = useAppSelector(
    ({ writings }) => writings.byId[writingId as string].blocks[0]
  );
  const paragraphs = useParagraphsByWritingId(writingId as string);
  return (
    <div>
      {paragraphs.map((_, i) => (
        <ParagraphEditor key={i} blockId={blockId} index={i} />
      ))}
    </div>
  );
};

export default WritingViewer;
