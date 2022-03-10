import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/useRedux';
import { fetchEditingByUserId } from '../../features/writings/actions';
import WritingFooter from '../../features/writings/components/WritingFooter/WritingFooter';
import Main from '../Main/Main';

const Writing = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);

  useEffect(() => {
    dispatch(fetchEditingByUserId(userId));
  }, [userId]);

  return (
    <Main>
      <Outlet />
      <WritingFooter />
    </Main>
  );
};

export default Writing;
