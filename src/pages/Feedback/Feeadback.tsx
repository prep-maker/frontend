import React from 'react';

import Header from '../../common/components/Header/Header';
import FeedbackViewer from '../../features/reviews/components/FeedbackViewer/FeedbackViewer';

const Feedback = () => {
  return (
    <div>
      <Header isLoggedIn={false} />
      <FeedbackViewer />
    </div>
  );
};

export default Feedback;
