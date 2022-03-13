import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../../../app/store';
import { PLACEHOLDER } from '../../../../common/constants/auth';
import SignupForm from './SignupForm';

describe('LoginForm Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );
  });

  it('이메일과 이름과 비밀번호를 입력받는다.', () => {
    const emailInput = screen.getByPlaceholderText(
      PLACEHOLDER.EMAIL
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      PLACEHOLDER.PASSWORD
    ) as HTMLInputElement;
    const nameInput = screen.getByPlaceholderText(
      PLACEHOLDER.NAME
    ) as HTMLInputElement;

    userEvent.click(emailInput);
    userEvent.keyboard('hyemin@email.com');
    userEvent.click(passwordInput);
    userEvent.keyboard('password123');
    userEvent.click(nameInput);
    userEvent.keyboard('혜민');

    expect(emailInput.value).toBe('hyemin@email.com');
    expect(passwordInput.value).toBe('password123');
    expect(nameInput.value).toBe('혜민');
  });

  it('이메일과 비밀번호와 이름을 입력받지 않으면 가입하기 버튼이 활성화되지 않는다.', () => {
    expect(screen.getByText('가입하기')).toBeDisabled();
  });
});
