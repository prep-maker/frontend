import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './LinkTo.module.css';

type LinkProps<T> = {
  value: string;
  url: '/login' | '/writing' | '/signup' | '/review';
  state?: T;
};

const LinkTo = <T extends object>({ value, url, state }: LinkProps<T>) => {
  return (
    <Link to={url} className={styles.link} state={state}>
      {value}
    </Link>
  );
};

export default memo(LinkTo);
