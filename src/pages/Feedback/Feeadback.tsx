import React from 'react';

import Header from '../../common/components/Header/Header';
import ParagraphViewer from '../../features/reviews/components/ParagraphViewer/ParagraphViewer';

const Feedback = () => {
  return (
    <div>
      <Header isLoggedIn={false} />
      <ParagraphViewer />
    </div>
  );
};

export default Feedback;
