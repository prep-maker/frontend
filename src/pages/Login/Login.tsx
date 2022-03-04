import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styles from './Login.module.css';
import Header from '../../common/components/Header/Header';
import { useAppSelector } from '../../common/hooks/useRedux';

const Login = () => {
  const isLoggedIn = !!useAppSelector(({ user }) => user.id);
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/writing" />
      ) : (
        <>
          <Header />
          <main className={styles.main}>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
};

export default Login;
