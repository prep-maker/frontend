import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import useMobileQuery from '../../../../common/hooks/useMobileQuery';
import Button, {
  ButtonSkeleton,
} from '../../../../common/components/Button/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../common/hooks/useRedux';
import { createWriting } from '../../actions';
import styles from './WritingList.module.css';

type WritingListProps = {
  readonly writings: {
    id: string;
    title: string;
  }[];
  show?: boolean;
};

const cx = classNames.bind(styles);

const WritingList = ({ writings }: WritingListProps) => {
  const isMobile = useMobileQuery();
  const show = useAppSelector(({ ui }) => ui.show.writingList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleListClick = useCallback((writingId: string) => {
    navigate(`/writing/${writingId}`);
  }, []);

  const userId = useAppSelector(({ user }) => user.id);

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
      <ul className={styles.list}>
        {writings.map((writing) => (
          <li
            key={writing.id}
            className={cx('writing', { 'mobile-writing': isMobile })}
          >
            <Button
              border={!isMobile}
              value={writing.title}
              color="white"
              size="full"
              onClick={() => handleListClick(writing.id)}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default WritingList;

export const WritingListSkeleton = () => {
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
      <ul className={styles.list}>
        <li className={styles.writing}>
          <ButtonSkeleton size="full" />
        </li>
        <li className={styles.writing}>
          <ButtonSkeleton size="full" />
        </li>
      </ul>
    </aside>
  );
};
