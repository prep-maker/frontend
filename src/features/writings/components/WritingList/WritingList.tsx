import React, { memo, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import useMobileQuery from '../../../../common/hooks/useMobileQuery';
import Button, {
  ButtonSkeleton,
} from '../../../../common/components/Button/Button';
import useWritings from '../../hooks/useWritings';
import styles from './WritingList.module.css';

const cx = classNames.bind(styles);

const WritingList = ({ responsive = true }: { responsive?: boolean }) => {
  const isMobile = useMobileQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const handleListClick = useCallback((writingId: string) => {
    const url = location.pathname.includes('/writing') ? '/writing' : '/review';
    navigate(`${url}/${writingId}`);
  }, []);
  const writings = useWritings();

  return (
    <>
      {writings.length ? (
        <ul className={styles.list}>
          {writings.map((writing) => (
            <li
              key={writing.id}
              className={cx('writing', {
                'mobile-writing': isMobile && responsive,
              })}
            >
              <Button
                border={!(isMobile && responsive)}
                value={writing.title}
                color="white"
                size="full"
                onClick={() => handleListClick(writing.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>글이 없습니다.</div>
      )}
    </>
  );
};

export const WritingListSkeleton = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.writing}>
        <ButtonSkeleton size="full" />
      </li>
      <li className={styles.writing}>
        <ButtonSkeleton size="full" />
      </li>
    </ul>
  );
};

export default memo(WritingList);
