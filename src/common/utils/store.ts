import { WritableDraft } from 'immer/dist/internal';
import { NormalizedObjects } from '../../common/types/state';

export const deleteFromStore = <T>(
  state: WritableDraft<NormalizedObjects<T>>,
  id: string
) => {
  delete state.byId[id];
  state.allIds = state.allIds.filter((idItem) => idItem !== id);
};
