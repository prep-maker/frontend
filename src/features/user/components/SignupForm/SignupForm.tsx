import React, { MouseEvent } from 'react';

import useInput from '../../../../common/hooks/useInput';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../../../../common/utils/validators';
import Button from '../../../../common/components/Button/Button';
import { useAppDispatch } from '../../../../common/hooks/useRedux';
import { PLACEHOLDER } from '../../../../common/constants/auth';
import { signup } from '../../userSlice';
import LoginInput from '../LoginInput/LoginInput';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const [email, isEmailValid, handleEmailChange] = useInput('', validateEmail);
  const [password, isPasswordlValid, handlePasswordChange] = useInput(
    '',
    validatePassword
  );
  const [name, isNameValid, handleNameChange] = useInput('', validateName);

  const dispatch = useAppDispatch();
  const handleButtonClick = (e?: MouseEvent) => {
    e?.preventDefault();
    dispatch(signup({ email, password, name }));
  };

  return (
    <form className={styles.wrapper}>
      <div>
        <label htmlFor="email">이메일</label>
        <LoginInput
          type="email"
          name="email"
          value={email}
          minLength={5}
          maxLength={30}
          placeholder={PLACEHOLDER.EMAIL}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="email">비밀번호</label>
        <LoginInput
          type="password"
          name="password"
          value={password}
          minLength={6}
          maxLength={15}
          placeholder={PLACEHOLDER.PASSWORD}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="email">이름</label>
        <LoginInput
          type="text"
          name="name"
          value={name}
          minLength={1}
          maxLength={20}
          placeholder={PLACEHOLDER.NAME}
          onChange={handleNameChange}
        />
      </div>
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
