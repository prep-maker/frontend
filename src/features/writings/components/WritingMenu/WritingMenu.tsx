import React, { memo, useCallback } from 'react';
import classNames from 'classnames/bind';
import { AiOutlinePlus } from 'react-icons/ai';

import useMobileQuery from '../../../../common/hooks/useMobileQuery';
import Button, {
  ButtonSkeleton,
} from '../../../../common/components/Button/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { createWriting } from '../../actions';
import WritingList, { WritingListSkeleton } from '../WritingList/WritingList';
import styles from './WritingMenu.module.css';

const cx = classNames.bind(styles);

const WritingMenu = () => {
  const isMobile = useMobileQuery();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(({ user }) => user.id);
  const show = useAppSelector(({ ui }) => ui.show.writingList);

  const handleCreate = useCallback(() => {
    dispatch(createWriting(userId));
  }, [userId]);

  return (
    <aside
      className={cx(
        'wrapper',
        { 'mobile-wrapper': isMobile },
        { visible: show }
      )}
    >
      <header className={cx('header', { 'mobile-header': isMobile })}>
        <Button
          border={!isMobile}
          value={isMobile ? '새 글 작성' : <AiOutlinePlus />}
          circle={!isMobile}
          size={isMobile ? 'full' : 'middle'}
          color="green"
          onClick={handleCreate}
        />
      </header>
      <WritingList />
    </aside>
  );
};

export default memo(WritingMenu);

export const WritingMenuSkeleton = () => {
  const isMobile = useMobileQuery();
  const show = useAppSelector(({ ui }) => ui.show.writingList);

  return (
    <aside
      className={cx(
        'wrapper',
        { 'mobile-wrapper': isMobile },
        { visible: show }
      )}
    >
      <header className={cx('header', { 'mobile-header': isMobile })}>
        <ButtonSkeleton
          size={isMobile ? 'full' : 'middle'}
          circle={!isMobile}
        />
      </header>
      <WritingListSkeleton />
    </aside>
  );
};
