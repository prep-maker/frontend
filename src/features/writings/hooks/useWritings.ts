import { useAppSelector } from '../../../common/hooks/useRedux';

const useWritings = () => {
  const allIds = useAppSelector(({ writings }) => writings.allIds);
  const byId = useAppSelector(({ writings }) => writings.byId);

  return allIds.map((id) => byId[id]);
};

export default useWritings;
