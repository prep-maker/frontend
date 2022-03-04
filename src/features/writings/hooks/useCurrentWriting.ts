import { useAppSelector } from '../../../common/hooks/useRedux';
import { Writing } from '../writingsSlice';

const useCurrentWriting = (): Writing => {
  const current = useAppSelector(({ writings }) => writings.current);
  const writingsById = useAppSelector(({ writings }) => writings.byId);

  return writingsById[current];
};

export default useCurrentWriting;
