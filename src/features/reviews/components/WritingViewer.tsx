import React from 'react';
import { useParams } from 'react-router-dom';
import useParagraphsByWritingId from '../hooks/useParagraphsByWritingId';

const WritingViewer = () => {
  const { writingId } = useParams();
  const paragraphs = useParagraphsByWritingId(writingId as string);
  return <div>WritingViewer</div>;
};

export default WritingViewer;
