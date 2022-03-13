import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import classNames from 'classnames/bind';
import { GiHamburgerMenu } from 'react-icons/gi';

import { logout } from '../../../features/user/userSlice';
import { toggleWritingList } from '../../../features/ui/uiSlice';
import useMobileQuery from '../../hooks/useMobileQuery';
import { useAppDispatch } from '../../hooks/useRedux';
import styles from './Header.module.css';

const cx = classNames.bind(styles);

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const dispatch = useAppDispatch();
  const isMobile = useMobileQuery();

  const location = useLocation();
  const isWritingPage = location.pathname.includes('/writing');

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleClickHamburger = () => {
    dispatch(toggleWritingList());
  };

  return (
    <header className={styles.header}>
      <div className={styles.white}>
        {isMobile && isLoggedIn ? (
          <button
            className={styles.hamburger}
            onClick={handleClickHamburger}
            data-testid="hamburger"
          >
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
            <button
              className={styles.logout}
              onClick={handleLogout}
              data-testid="logout"
            >
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
