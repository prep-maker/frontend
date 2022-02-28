import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Login.module.css';
import Header from '../../common/components/Header/Header';

const Login = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Login;
