import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';

import ErrorAlert from './ErrorAlert';
import { store } from '../../../app/store';
import { alertError } from '../../../features/ui/uiSlice';

describe('ErrorAlert Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <ErrorAlert />
      </Provider>
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('에러가 발생하면 에러 메세지를 보여준다.', () => {
    store.dispatch(alertError('테스트'));
    const error = screen.getByText('테스트');

    expect(error).toBeInTheDocument();
  });

  it('에러 메세지를 1초간 보여준 후 화면에서 사라진다.', async () => {
    store.dispatch(alertError('테스트'));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const error = screen.queryByText('테스트');
    expect(error).not.toBeInTheDocument();
  });
});
