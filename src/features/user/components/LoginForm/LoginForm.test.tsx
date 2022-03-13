import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../../../../app/store';
import { PLACEHOLDER } from '../../../../common/constants/auth';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </MemoryRouter>
    );
  });

  it('이메일과 비밀번호를 입력받는다.', () => {
    const emailInput = screen.getByPlaceholderText(
      PLACEHOLDER.EMAIL
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      PLACEHOLDER.PASSWORD
    ) as HTMLInputElement;

    userEvent.click(emailInput);
    userEvent.keyboard('hyemin@email.com');
    userEvent.click(passwordInput);
    userEvent.keyboard('password123');

    expect(emailInput.value).toBe('hyemin@email.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('이메일과 비밀번호가 입력되지 않으면 로그인 버튼이 활성화되지 않는다.', () => {
    expect(screen.getByText('로그인')).toBeDisabled();
  });

  it('회원가입 링크가 있다.', () => {
    expect(screen.getByText('회원가입')).toBeInTheDocument();
  });
});
