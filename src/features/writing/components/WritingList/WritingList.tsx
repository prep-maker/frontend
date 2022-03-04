import React from 'react';
import classNames from 'classnames/bind';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './WritingList.module.css';
import useMobileQuery from '../../../../common/hooks/useMobileQuery';
import Button from '../../../../common/components/Button/Button';
import { useAppSelector } from '../../../../common/hooks/useRedux';

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
          onClick={() => {}}
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
              color="transparent"
              size="full"
              onClick={() => {}}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default WritingList;
