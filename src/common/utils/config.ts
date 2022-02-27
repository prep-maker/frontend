const getEnv = <T>(key: string, defaultValue?: T): T | string => {
  const value = process.env[key] || defaultValue;

  if (value == null) {
    throw new Error('환경 변수가 없습니다.');
  }

  return value;
};

type Config = {
  baseUrl: string;
};

const config: Config = {
  baseUrl: getEnv('REACT_APP_BASE_URL'),
};

export default config;
