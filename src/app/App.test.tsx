import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import dummyWritings from '../features/writings/__mocks__/dummyWritings.json';
import { USER_NAME } from '../features/user/__mocks__/authAPI';
import { PLACEHOLDER } from '../common/constants/auth';
import { logout } from '../features/user/userSlice';
import { CORRECTION } from '../common/constants/correction';
import ERROR from '../common/constants/error';
import { store } from './store';
import App from './App';

jest.mock('../features/user/authAPI');
jest.mock('../features/writings/writingAPI');
jest.mock('../features/blocks/blockAPI');

describe('App', () => {
  describe('Login Page', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });
    afterEach(() => {
      jest.clearAllMocks();
      store.dispatch(logout());
    });

    it('로그인 폼이 있다.', () => {
      const emailInput = screen.getByPlaceholderText(PLACEHOLDER.EMAIL);
      const passwordInput = screen.getByPlaceholderText(PLACEHOLDER.PASSWORD);
      const button = screen.getByText('로그인');

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('회원가입 링크를 클릭하면 회원가입 페이지로 전환된다.', () => {
      const link = screen.getByText('회원가입');

      userEvent.click(link);

      expect(screen.getByText('가입하기')).toBeInTheDocument();
    });

    it('로그인하면 writing 페이지로 전환된다.', async () => {
      login();
      const addButton = await screen.findByTitle('add writing');
      const nav = screen.getByText('편집');

      expect(addButton).toBeInTheDocument();
      expect(nav).not.toHaveClass('inactive');
    });
  });

  describe('Writing Page', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <DndProvider backend={HTML5Backend}>
              <App />
            </DndProvider>
          </MemoryRouter>
        </Provider>
      );
      login();
    });
    afterEach(() => {
      jest.clearAllMocks();
      store.dispatch(logout());
    });

    it('로그인한 유저가 작성한 편집중인 글 목록을 불러온다.', async () => {
      const editings = dummyWritings.filter((writing) => !writing.isDone);

      for (const editing of editings) {
        const titles = await screen.findAllByText(editing.title);
        expect(titles[0]).toBeInTheDocument();
      }
    });

    it('글 생성 버튼을 클릭하면 새로운 글이 생성된다.', async () => {
      const button = await screen.findByTitle('add writing');

      userEvent.click(button);

      const titles = await screen.findAllByText('Untitled');
      expect(titles[0]).toBeInTheDocument();
    });

    it('로그아웃 하면 로그인 페이지로 전환된다.', async () => {
      const logout = await screen.findByTitle('logout');

      userEvent.click(logout);

      expect(screen.getByText('로그인')).toBeInTheDocument();
    });

    describe('글 제목을 클릭했을 때', () => {
      let PREPButton: HTMLElement;
      beforeEach(async () => {
        const button = await screen.findByTitle('add writing');
        userEvent.click(button);
        const title = await screen.findAllByText('Untitled');
        userEvent.click(title[0]);

        const blockEditorHeader = screen.getByTestId('block-editor-header');
        PREPButton = within(blockEditorHeader).getByText('PREP');
      });

      it('블록 에디터를 보여준다', () => {
        expect(screen.getByTestId('block-editor-header')).toBeInTheDocument();
      });

      it('삭제 버튼을 누면 글을 삭제한다.', async () => {
        const button = screen.getByText('삭제');

        userEvent.click(button);

        await waitFor(() => {
          const writing = screen.queryByText('Untitled');
          expect(writing).not.toBeInTheDocument();
        });
      });

      it('블록 생성 버튼을 클릭하면 알맞는 타입의 블록을 생성한다.', async () => {
        const blockEditorHeader = screen.getByTestId('block-editor-header');
        const PButton = within(blockEditorHeader).getByText('P');
        const RButton = within(blockEditorHeader).getByText('R');
        const EButton = within(blockEditorHeader).getByText('E');

        userEvent.click(PButton);
        userEvent.click(RButton);
        userEvent.click(EButton);
        userEvent.click(PREPButton);

        const PBlocks = await screen.findAllByTestId('P-block');
        const RBlocks = screen.getAllByTestId('R-block');
        const EBlocks = screen.getAllByTestId('E-block');
        expect(PBlocks.length).toBe(3);
        expect(EBlocks.length).toBe(2);
        expect(RBlocks.length).toBe(2);
      });

      it('블록 타입에 따라 문장을 검사한다.', async () => {
        userEvent.click(PREPButton);
        const correction1 = await screen.findAllByText(CORRECTION.MIN_LETTER);
        const correction2 = await screen.findByText(CORRECTION.RESULT_REQUIRED);

        expect(correction1[0]).toBeInTheDocument();
        expect(correction2).toBeInTheDocument();
      });

      it('문장 검사를 통과한 블록은 드래그 앤 드랍으로 합친다.', async () => {
        userEvent.click(PREPButton);
        const PBlocks = await screen.findAllByTestId('P-block');
        const RBlock = screen.getByTestId('R-block');

        fireEvent.dragStart(RBlock);
        fireEvent.drop(PBlocks[0]);
        const error = await screen.findByText(ERROR.CORRECTION_REQUIRED);
        expect(error).toBeInTheDocument();

        const inputList = screen.getAllByTestId('textarea');
        userEvent.type(inputList[0], '떡볶이는 맛있습니다.');
        userEvent.type(inputList[1], '왜냐하면 달콤하기 때문입니다.');
        fireEvent.dragStart(RBlock);
        fireEvent.drop(PBlocks[0]);

        const PRBlock = await screen.findByTestId('PR-block');
        expect(PRBlock).toBeInTheDocument();
      });

      it('블록 삭제 버튼을 클릭하면 블록을 삭제한다.', async () => {
        userEvent.click(PREPButton);
        const buttons = await screen.findAllByTitle('delete block');

        buttons.forEach((button) => userEvent.click(button));

        const message = await screen.findByText('내용이 없습니다.');
        expect(message).toBeInTheDocument();
      });

      it('블록이 여러개면 완료 버튼을 눌렀을 때 에러 메세지를 보여준다', () => {
        userEvent.click(PREPButton);
        const finishButton = screen.getByText('완료');

        userEvent.click(finishButton);

        expect(screen.getByText(ERROR.COMBINE_REQUIRED)).toBeInTheDocument();
      });

      it('PREP 블록이 1개 있으면 완료 버튼을 누를 수 있다.', async () => {
        userEvent.click(PREPButton);
        const inputList = await screen.findAllByTestId('textarea');
        const finishButton = screen.getByText('완료');

        userEvent.type(inputList[0], '떡볶이는 맛있습니다.');
        userEvent.type(inputList[1], '왜냐하면 달콤하기 때문입니다.');
        userEvent.type(inputList[2], '로제 떡볶이도 맛있습니다.');
        userEvent.type(inputList[3], '그러므로 떡볶이는 맛있습니다.');
        const PBlocks = screen.getAllByTestId('P-block');
        const RBlock = screen.getByTestId('R-block');
        fireEvent.dragStart(RBlock);
        fireEvent.drop(PBlocks[0]);
        const PRBlock = await screen.findByTestId('PR-block');
        const EBlock = screen.getByTestId('E-block');
        fireEvent.dragStart(EBlock);
        fireEvent.drop(PRBlock);
        const PREBlock = await screen.findByTestId('PRE-block');
        fireEvent.dragStart(PBlocks[1]);
        fireEvent.drop(PREBlock);
        userEvent.click(finishButton);

        await waitFor(() => {
          const nav = screen.getByText('검토');
          expect(nav).not.toHaveClass('inactive');
        });
      });
    });
  });

  describe('Review Page', () => {
    beforeEach(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      );
      login();
      const nav = await screen.findByText('검토');
      userEvent.click(nav);
      const writing = await screen.findAllByText('test 1');
      userEvent.click(writing[0]);
    });
    afterEach(() => {
      jest.clearAllMocks();
      store.dispatch(logout());
    });

    it('글 제목을 클릭하여 수정할 수 있다.', async () => {
      const title = screen.getAllByText('test 1')[1];
      userEvent.dblClick(title);
      const input = screen.getByDisplayValue('test 1');

      userEvent.type(input, 'update');
      userEvent.keyboard('{enter}');

      const updated = await screen.findAllByText(/update/g);
      expect(updated[0]).toBeInTheDocument();
      expect(updated[1]).toBeInTheDocument();
    });

    it('문단을 클릭하여 문단 내용을 수정할 수 있다.', async () => {
      const paragraph = screen.getByText('R 문단');
      userEvent.dblClick(paragraph);
      const input = screen.getByDisplayValue('R 문단');

      userEvent.type(input, 'update');
      userEvent.keyboard('{enter}');

      const updated = await screen.findByText(/update/g);
      expect(updated).toBeInTheDocument();
    });

    it('복사 버튼이 있다.', () => {
      expect(screen.getByText('복사')).toBeInTheDocument();
    });

    it('공유 버튼을 클릭하면 피드백 페이지 링크를 복사할 수 있다', () => {
      const button = screen.getByText('공유');

      userEvent.click(button);

      expect(screen.getByText('링크 복사')).toBeInTheDocument();
    });

    it('삭제 버튼을 누면 글을 삭제한다.', async () => {
      const button = screen.getByText('삭제');

      userEvent.click(button);

      await waitFor(() => {
        const writing = screen.queryByText('Untitled');
        expect(writing).not.toBeInTheDocument();
      });
    });
  });

  describe('Feedback Page', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/feedback/1']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });

    it('url의 param과 id가 일치하는 글을 보여준다.', () => {
      expect(screen.getByText('test 1')).toBeInTheDocument();
    });

    it('로그인하지 않은 유저가 문단을 클릭하면 로그인 링크를 보여준다.', () => {
      const paragraph = screen.getByText('R 문단');

      userEvent.click(paragraph);

      expect(screen.getByText('로그인하러 가기')).toBeInTheDocument();
    });

    it('로그인한 유저가 문단을 클릭하면 코멘트를 작성할 수 있다.', async () => {
      const paragraph = screen.getByText('R 문단');
      userEvent.click(paragraph);
      const link = screen.getByText('로그인하러 가기');

      userEvent.click(link);
      login();
      await waitFor(() => {
        const paragraph = screen.getByText('R 문단');
        userEvent.click(paragraph);
      });

      expect(screen.getByText('작성')).toBeInTheDocument();
      store.dispatch(logout());
    });

    describe('코멘트를 작성했을 때', () => {
      beforeEach(async () => {
        const paragraph = screen.getByText('R 문단');
        userEvent.click(paragraph);
        const link = screen.getByText('로그인하러 가기');
        userEvent.click(link);
        login();
        await waitFor(() => {
          const paragraph = screen.getByText('R 문단');
          userEvent.click(paragraph);
        });
        const comment = screen.getByTestId('textarea');
        const button = screen.getByText('작성');

        userEvent.type(comment, '코멘트 테스트');
        userEvent.click(button);
      });
      afterEach(() => {
        store.dispatch(logout());
      });

      it('작성 버튼을 클릭하면 작성자의 이름과 코멘트가 pending 상태임을 표시한다.', async () => {
        const pending = await screen.findByText('pending');
        expect(pending).toBeInTheDocument();
        expect(screen.getByText(USER_NAME)).toBeInTheDocument();
      });

      it('완료 버튼과 전송 버튼을 클릭하면 pending 상태였던 코멘트를 저장한다.', async () => {
        const finish = screen.getByRole('button', { name: /완료/g });
        userEvent.click(finish);
        const send = screen.getByText('전송');

        userEvent.click(send);

        await waitFor(() => {
          const pending = screen.queryByText('pending');
          const comment = screen.getByText('코멘트 테스트');
          expect(pending).not.toBeInTheDocument();
          expect(comment).toBeInTheDocument();
        });
      });

      it('완료 버튼과 취소 버튼을 클릭하면 pending 상태였던 코멘트들을 삭제한다.', async () => {
        const finish = screen.getByRole('button', { name: /완료/g });
        userEvent.click(finish);
        const cancel = screen.getByText('취소');

        userEvent.click(cancel);

        await waitFor(() => {
          const pending = screen.queryByText('pending');
          const comment = screen.queryByText('코멘트 테스트');
          expect(pending).not.toBeInTheDocument();
          expect(comment).not.toBeInTheDocument();
        });
      });

      it('완료 버튼과 취소 버튼을 클릭하면 pending 상태였던 코멘트들을 삭제한다.', async () => {
        const finish = screen.getByRole('button', { name: /완료/g });
        userEvent.click(finish);
        const cancel = screen.getByText('취소');

        userEvent.click(cancel);

        await waitFor(() => {
          const pending = screen.queryByText('pending');
          const comment = screen.queryByText('코멘트 테스트');
          expect(pending).not.toBeInTheDocument();
          expect(comment).not.toBeInTheDocument();
        });
      });

      it('코멘트 삭제 버튼을 클릭하면 저장된 코멘트를 삭제한다.', async () => {
        const finish = screen.getByRole('button', { name: /완료/g });
        userEvent.click(finish);
        const send = screen.getByText('전송');
        userEvent.click(send);
        const button = await screen.findByTitle('delete comment');

        userEvent.click(button);

        await waitFor(() => {
          const comment = screen.queryByText('코멘트 테스트');
          expect(comment).not.toBeInTheDocument();
        });
      });
    });
  });
});

const login = () => {
  const emailInput = screen.getByPlaceholderText(PLACEHOLDER.EMAIL);
  const passwordInput = screen.getByPlaceholderText(PLACEHOLDER.PASSWORD);
  const button = screen.getByText('로그인');

  userEvent.type(emailInput, 'hyemin@email.com');
  userEvent.type(passwordInput, 'password123');
  userEvent.click(button);
};
