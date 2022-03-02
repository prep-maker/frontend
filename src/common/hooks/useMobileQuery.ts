import React from 'react';
import { useMediaQuery } from 'react-responsive';

const MOBILE_SCREEN_WIDTH = 768;

const useMobileQuery = (): boolean => {
  const isMobile = useMediaQuery({ maxWidth: MOBILE_SCREEN_WIDTH });

  return isMobile;
};

export default useMobileQuery;
