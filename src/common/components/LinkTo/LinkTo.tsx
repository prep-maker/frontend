import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './LinkTo.module.css';

type LinkProps = {
  value: string;
  url: '/login' | '/writing' | '/signup' | '/review';
};

const LinkTo = ({ value, url }: LinkProps) => {
  return (
    <Link to={url} className={styles.link}>
      {value}
    </Link>
  );
};

export default memo(LinkTo);
