import React, { MouseEvent, useCallback } from 'react';

import Button from '../../../../common/components/Button/Button';
import LinkTo from '../../../../common/components/LinkTo/LinkTo';
import useInput from '../../../../common/hooks/useInput';
import {
  validateEmail,
  validatePassword,
} from '../../../../common/utils/validators';
import { useAppDispatch } from '../../../../common/hooks/useRedux';
import { login } from '../../userSlice';
import { LoginInfo } from '../../types';
import LoginInput from '../LoginInput/LoginInput';
import styles from './LoginForm.module.css';
import { PLACEHOLDER } from '../../../../common/constants/auth';

const LoginForm = () => {
  const [email, isEmailValid, handleEmailChange] = useInput('', validateEmail);
  const [password, isPasswordlValid, handlePasswordChange] = useInput(
    '',
    validatePassword
  );

  const dispatch = useAppDispatch();

  const handleButtonClick = useCallback((user: LoginInfo, e?: MouseEvent) => {
    e?.preventDefault();
    dispatch(login(user));
  }, []);

  return (
    <form className={styles.wrapper}>
      <LoginInput
        type="email"
        name="email"
        placeholder={PLACEHOLDER.EMAIL}
        value={email}
        minLength={5}
        maxLength={30}
        onChange={handleEmailChange}
      />
      <LoginInput
        type="password"
        name="password"
        placeholder={PLACEHOLDER.PASSWORD}
        value={password}
        minLength={6}
        maxLength={15}
        onChange={handlePasswordChange}
      />
      <Button
        value="로그인"
        color="blue"
        size="long"
        disabled={!isPasswordlValid || !isEmailValid}
        onClick={(e) => handleButtonClick({ email, password }, e)}
      />
      <LinkTo url="/signup" value="회원가입" />
    </form>
  );
};

export default LoginForm;
