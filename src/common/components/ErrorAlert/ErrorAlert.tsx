import React, { memo, useEffect } from 'react';
import styles from './ErrorAlert.module.css';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { clearError } from '../../../features/ui/uiSlice';

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

  return <div>{error && <div className={styles.banner}>{error}</div>}</div>;
};

export default memo(ErrorAlert);
