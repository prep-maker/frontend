import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../api';
import { LoginInfo, User, UserState } from '../type';
import { fetchUser } from '../userSlice';
import { alertError } from '../../ui/uiSlice';
import { useAppDispatch } from '../../../common/hooks/useRedux';
import useApi from '../../../common/hooks/useApi';

type AuthHandler = {
  readonly onSignup: (user: User) => Promise<void>;
  readonly onLogin: (user: Omit<User, 'name'>) => Promise<void>;
};

const authApi = useApi(AuthAPI);

const useAuthService = (): AuthHandler => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAuth = (userResponse: UserState) => {
    dispatch(fetchUser(userResponse));
    navigate('/writing');
  };

  const onSignup = async (user: User): Promise<void> => {
    try {
      const userResponse: UserState = await authApi.signup(user);
      onAuth(userResponse);
    } catch (error) {
      const err = error as Error;
      dispatch(alertError(err.message));
    }
  };

  const onLogin = async (user: LoginInfo): Promise<void> => {
    try {
      const userResponse: UserState = await authApi.login(user);
      onAuth(userResponse);
    } catch (error) {
      const err = error as Error;
      dispatch(alertError(err.message));
    }
  };

  return { onSignup, onLogin };
};

export default useAuthService;
