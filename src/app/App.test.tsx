import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import App from './App';
import { PLACEHOLDER } from '../common/constants/auth';

jest.mock('../features/user/authAPI');
jest.mock('../features/writings/writingAPI');

describe('App', () => {
  describe('Login page', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });

    it('로그인 폼이 있다.', () => {
      const emailInput = screen.getByPlaceholderText(PLACEHOLDER.EMAIL);
      const passwordInput = screen.getByPlaceholderText(PLACEHOLDER.PASSWORD);
      const button = screen.getByText('로그인');

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('회원가입 링크를 누르면 회원가입 페이지로 전환된다.', () => {
      const link = screen.getByText('회원가입');

      userEvent.click(link);

      expect(screen.getByText('가입하기')).toBeInTheDocument();
    });

    it('로그인하면 writing 페이지로 전환된다.', async () => {
      const emailInput = screen.getByPlaceholderText(PLACEHOLDER.EMAIL);
      const passwordInput = screen.getByPlaceholderText(PLACEHOLDER.PASSWORD);
      const button = screen.getByText('로그인');

      userEvent.type(emailInput, 'hyemin@email.com');
      userEvent.type(passwordInput, 'password123');
      userEvent.click(button);

      const texts = await screen.findAllByText('글이 없습니다.');
      for (const text of texts) {
        expect(text).toBeInTheDocument();
      }
    });
  });
});
