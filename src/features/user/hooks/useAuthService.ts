import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../type';
import AuthAPI from '../api';
import { fetchUser } from '../userSlice';
import { alertError } from '../../ui/uiSlice';
import { useAppDispatch } from '../../../common/hooks/useRedux';
import useApi from '../../../common/hooks/useApi';

type Handler = {
  onSignup: (user: User) => Promise<void>;
};

const authApi = useApi(AuthAPI);

const useAuthService = (): Handler => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSignup = async (user: User): Promise<void> => {
    try {
      const userData = await authApi.signup(user);
      dispatch(fetchUser(userData));
      navigate('/writing');
    } catch (error) {
      const err = error as Error;
      dispatch(alertError(err.message));
    }
  };

  return { onSignup };
};

export default useAuthService;
