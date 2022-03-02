import React from 'react';
import classNames from 'classnames/bind';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './SideBar.module.css';
import useMobileQuery from '../../../../common/hooks/useMobileQuery';
import Button from '../../../../common/components/Button/Button';

type SideBarProps = {
  readonly writings: {
    id: string;
    title: string;
  }[];
};

const cx = classNames.bind(styles);

const SideBar = ({ writings }: SideBarProps) => {
  const isMobile = useMobileQuery();

  return (
    <aside className={cx('wrapper', { 'mobile-wrapper': isMobile })}>
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

export default SideBar;
