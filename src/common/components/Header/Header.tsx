import React, { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import classNames from 'classnames/bind';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import useMobileQuery from '../../hooks/useMobileQuery';
import { logout } from '../../../features/user/userSlice';
import { toggleWritingList } from '../../../features/ui/uiSlice';

const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMobileQuery();
  const isLoggedIn = !!useAppSelector(({ user }) => user.id);

  const location = useLocation();
  const isWritingPage = location.pathname === '/writing';
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleClickHamburger = () => {
    dispatch(toggleWritingList());
  };

  return (
    <header className={styles.header}>
      <div className={styles.white}>
        {isMobile && !isAuthPage ? (
          <button className={styles.hamburger} onClick={handleClickHamburger}>
            <GiHamburgerMenu size={25} />
          </button>
        ) : (
          <div>PREP Maker</div>
        )}
        {isLoggedIn && (
          <>
            <nav className={styles.nav}>
              <Link
                to="/writing"
                className={cx('link', { inactive: !isWritingPage })}
              >
                편집
              </Link>
              <Link
                to="/review"
                className={cx('link', { inactive: isWritingPage })}
              >
                검토
              </Link>
            </nav>
            <button className={styles.logout} onClick={handleLogout}>
              <FiLogOut size="30" />
            </button>
          </>
        )}
      </div>
      <div className={styles.yellow}></div>
    </header>
  );
};

export default memo(Header);
