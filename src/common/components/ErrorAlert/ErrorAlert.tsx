import React, { memo, useEffect } from 'react';
import styles from './ErrorAlert.module.css';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { alertError } from '../../../features/ui/uiSlice';

const ErrorAlert = () => {
  const error = useAppSelector((state) => state.ui.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (error) {
      timer = setTimeout(() => {
        dispatch(alertError(''));
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, []);

  return <div>{error && <div className={styles.banner}>{error}</div>}</div>;
};

export default memo(ErrorAlert);
