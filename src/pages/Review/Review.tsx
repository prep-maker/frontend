import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/useRedux';
import { fetchDoneByUserId } from '../../features/writings/actions';
import Main from '../Main/Main';

const Review = () => {
  const userId = useAppSelector(({ user }) => user.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDoneByUserId(userId));
  }, [userId]);

  return (
    <Main>
      <Outlet />
    </Main>
  );
};

export default Review;
