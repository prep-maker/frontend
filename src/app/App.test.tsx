import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  fireEvent,
  render,
  Screen,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import dummyWritings from '../features/writings/__mocks__/dummyWritings.json';
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

    it('회원가입 링크를 누르면 회원가입 페이지로 전환된다.', () => {
      const link = screen.getByText('회원가입');

      userEvent.click(link);

      expect(screen.getByText('가입하기')).toBeInTheDocument();
    });

    it('로그인하면 writing 페이지로 전환된다.', async () => {
      login(screen);
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
          <MemoryRouter initialEntries={['/writing']}>
            <DndProvider backend={HTML5Backend}>
              <App />
            </DndProvider>
          </MemoryRouter>
        </Provider>
      );
    });
    afterEach(() => {
      jest.clearAllMocks();
      store.dispatch(logout());
    });

    it('로그인한 유저가 작성한 편집중인 글 목록을 불러온다.', async () => {
      login(screen);
      const editings = dummyWritings.filter((writing) => !writing.isDone);

      for (const editing of editings) {
        const titles = await screen.findAllByText(editing.title);
        expect(titles[0]).toBeInTheDocument();
      }
    });

    it('글 생성 버튼을 클릭하면 새로운 글이 생성된다.', async () => {
      login(screen);
      const button = await screen.findByTitle('add writing');

      userEvent.click(button);

      const titles = await screen.findAllByText('Untitled');
      expect(titles[0]).toBeInTheDocument();
    });

    it('로그아웃 하면 로그인 페이지로 전환된다.', async () => {
      login(screen);
      const logout = await screen.findByTitle('logout');

      userEvent.click(logout);

      expect(screen.getByText('로그인')).toBeInTheDocument();
    });

    describe('글 제목을 클릭했을 때', () => {
      let PREPButton: HTMLElement;
      beforeEach(async () => {
        login(screen);

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

      it('블록을 삭제 버튼을 누르면 블록을 삭제한다.', async () => {
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
          <MemoryRouter initialEntries={['/review']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      login(screen);
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

      const updated = await screen.findByText(/update/g);
      expect(updated).toBeInTheDocument();
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

    it('공유 버튼을 누르면 피드백 페이지 링크를 복사할 수 있다', () => {
      const button = screen.getByText('공유');

      userEvent.click(button);

      expect(screen.getByText('링크 복사')).toBeInTheDocument();
    });
  });
});

const login = async (screen: Screen) => {
  const emailInput = screen.getByPlaceholderText(PLACEHOLDER.EMAIL);
  const passwordInput = screen.getByPlaceholderText(PLACEHOLDER.PASSWORD);
  const button = screen.getByText('로그인');

  userEvent.type(emailInput, 'hyemin@email.com');
  userEvent.type(passwordInput, 'password123');
  userEvent.click(button);
};
