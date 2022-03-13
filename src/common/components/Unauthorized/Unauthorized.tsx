import React from 'react';
import { useLocation } from 'react-router-dom';

import LinkTo from '../LinkTo/LinkTo';
import styles from './Unauthorized.module.css';

const Unauthorized = () => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>로그인이 필요합니다.</div>
      <LinkTo
        url="/login"
        value="로그인하러 가기"
        state={{ pathname: location.pathname }}
      />
    </div>
  );
};

export default Unauthorized;
