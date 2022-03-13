import React, { memo } from 'react';

import { useAppSelector } from '../../hooks/useRedux';
import styles from './Loading.module.css';

const Loading = () => {
  const isLoading = useAppSelector(({ ui }) => ui.loading) === 'pending';

  return <>{isLoading && <div className={styles.spinner} />}</>;
};

export default memo(Loading);
