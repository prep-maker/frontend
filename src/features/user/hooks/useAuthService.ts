import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInfo, User, UserData } from '../type';
import AuthAPI from '../api';
import { fetchUser } from '../userSlice';
import { alertError } from '../../ui/uiSlice';
import { useAppDispatch } from '../../../common/hooks/useRedux';
import useApi from '../../../common/hooks/useApi';

type AuthHandler = {
  onSignup: (user: User) => Promise<void>;
  onLogin: (user: Omit<User, 'name'>) => Promise<void>;
};

const authApi = useApi(AuthAPI);

const useAuthService = (): AuthHandler => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSignup = async (user: User): Promise<void> => {
    try {
      const userData: UserData = await authApi.signup(user);
      dispatch(fetchUser(userData));
      navigate('/writing');
    } catch (error) {
      const err = error as Error;
      dispatch(alertError(err.message));
    }
  };

  const onLogin = async (user: LoginInfo): Promise<void> => {
    try {
      const userData: UserData = await authApi.login(user);
      dispatch(fetchUser(userData));
      navigate('/writing');
    } catch (error) {
      const err = error as Error;
      dispatch(alertError(err.message));
    }
  };

  return { onSignup, onLogin };
};

export default useAuthService;
