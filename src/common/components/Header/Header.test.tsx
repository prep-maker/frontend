import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Header from './Header';
import { store } from '../../../app/store';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('로그인하지 않았을 땐 로고만 보여준다.', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header isLoggedIn={false} />
        </Provider>
      </MemoryRouter>
    );
    const logo = screen.getByText('PREP Maker');
    const toEditing = screen.queryByText('편집');
    const toReview = screen.queryByText('검토');
    const logout = screen.queryByTitle('logout');

    expect(logo).toBeInTheDocument();
    expect(toEditing).not.toBeInTheDocument();
    expect(toReview).not.toBeInTheDocument();
    expect(logout).not.toBeInTheDocument();
  });

  it('로그인 했을 땐 nav 버튼과 로그아웃 버튼을 보여준다', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header isLoggedIn={true} />
        </Provider>
      </MemoryRouter>
    );
    const logo = screen.getByText('PREP Maker');
    const toEditing = screen.queryByText('편집');
    const toReview = screen.queryByText('검토');
    const logout = screen.queryByTitle('logout');

    expect(logo).toBeInTheDocument();
    expect(toEditing).toBeInTheDocument();
    expect(toReview).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
});
