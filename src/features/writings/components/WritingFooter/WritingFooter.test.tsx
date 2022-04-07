import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import { store } from '../../../../app/store';
import { fetchEditingByUserId } from '../../actions';
import * as actions from '../../../blocks/actions';
import WritingFooter from './WritingFooter';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ writingId: '3' }),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../writingAPI');

describe.only('WritingFooter Component', () => {
  const USER_ID = '622337793d451494bbb1c0c9';
  beforeEach(() => {
    render(
      <Provider store={store}>
        <WritingFooter />
      </Provider>
    );
    store.dispatch(fetchEditingByUserId(USER_ID));
  });

  it('삭제, 완료, 저장 버튼이 있다.', () => {
    const deleteButton = screen.getByText('삭제');
    const finishButton = screen.getByText('완료');
    const saveButton = screen.getByText('저장');

    expect(deleteButton).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it('삭제 버튼을 누르면 글이 삭제 된다.', async () => {
    const deleteButton = screen.getByText('삭제');

    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(store.getState().writings).not.toMatchObject({
        byId: {
          '3': { id: '3' },
        },
      });
    });
  });

  it('완료 버튼을 누르면 글의 isDone이 true가 된다.', async () => {
    const finishButton = screen.getByText('완료');

    userEvent.click(finishButton);

    await waitFor(() => {
      expect(store.getState().writings).not.toMatchObject({
        byId: {
          '3': { id: '3', isDone: true },
        },
      });
    });
  });

  it('저장 버튼을 누르면 글을 저장한다', () => {
    const saveButton = screen.getByText('저장');
    const spy = jest.spyOn(actions, 'saveBlocks');

    userEvent.click(saveButton);

    expect(spy).toHaveBeenCalled();
  });
});
