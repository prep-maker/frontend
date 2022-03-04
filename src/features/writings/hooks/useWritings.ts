import { useAppSelector } from '../../../common/hooks/useRedux';
import { Writing } from '../writingsSlice';

const useWritings = (): Writing[] => {
  const allIds = useAppSelector(({ writings }) => writings.allIds);
  const byId = useAppSelector(({ writings }) => writings.byId);

  return allIds.map((id) => byId[id]);
};

export default useWritings;
