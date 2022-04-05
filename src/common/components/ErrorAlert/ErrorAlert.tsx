import React, { memo, useEffect } from 'react';

import { clearError } from '../../../features/ui/uiSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import styles from './ErrorAlert.module.css';

const ErrorAlert = () => {
  const error = useAppSelector(({ ui }) => ui.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (error) {
      timer = setTimeout(() => {
        dispatch(clearError());
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  return <>{error && <div className={styles.banner}>{error}</div>}</>;
};

export default memo(ErrorAlert);
