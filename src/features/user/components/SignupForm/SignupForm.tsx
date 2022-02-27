import React, { MouseEvent } from 'react';
import LoginInput from '../LoginInput/LoginInput';
import useInput from '../../../../common/hooks/useInput';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../../../../common/utils/validators';
import Button from '../../../../common/components/Button/Button';
import useAuthService from '../../hooks/useAuthService';

const SignupForm = () => {
  const [email, isEmailValid, handleEmailChange] = useInput('', validateEmail);
  const [password, isPasswordlValid, handlePasswordChange] = useInput(
    '',
    validatePassword
  );
  const [name, isNameValid, handleNameChange] = useInput('', validateName);
  const { onSignup } = useAuthService();
  const handleButtonClick = (e?: MouseEvent) => {
    e?.preventDefault();
    onSignup({ email, password, name });
  };

  return (
    <form>
      <label htmlFor="email">이메일</label>
      <LoginInput
        type="email"
        name="email"
        value={email}
        minLength={5}
        maxLength={30}
        onChange={handleEmailChange}
      />
      <label htmlFor="email">비밀번호</label>
      <LoginInput
        type="password"
        name="password"
        value={password}
        minLength={6}
        maxLength={15}
        onChange={handlePasswordChange}
      />
      <label htmlFor="email">이름</label>
      <LoginInput
        type="text"
        name="name"
        value={name}
        minLength={1}
        maxLength={20}
        onChange={handleNameChange}
      />
      <Button
        value="가입하기"
        color="blue"
        size="long"
        disabled={!isPasswordlValid || !isEmailValid || !isNameValid}
        onClick={handleButtonClick}
      />
    </form>
  );
};

export default SignupForm;
