import React, { MouseEvent, useCallback } from 'react';
import styles from './LoginForm.module.css';
import Button from '../../../../common/components/Button/Button';
import LinkTo from '../../../../common/components/LinkTo/LinkTo';
import useInput from '../../../../common/hooks/useInput';
import {
  validateEmail,
  validatePassword,
} from '../../../../common/utils/validators';
import LoginInput from '../LoginInput/LoginInput';

const LoginForm = () => {
  const [email, isEmailValid, handleEmailChange] = useInput('', validateEmail);
  const [password, isPasswordlValid, handlePasswordChange] = useInput(
    '',
    validatePassword
  );

  const handleButtonClick = useCallback((e?: MouseEvent) => {
    e?.preventDefault();
  }, []);

  return (
    <form className={styles.wrapper}>
      <LoginInput
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요."
        value={email}
        minLength={5}
        maxLength={30}
        onChange={handleEmailChange}
      />
      <LoginInput
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
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
        onClick={handleButtonClick}
      />
      <LinkTo url="/signup" value="회원가입" />
    </form>
  );
};

export default LoginForm;
