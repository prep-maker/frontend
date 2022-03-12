import { WritableDraft } from 'immer/dist/internal';

export const deleteFromStore = <T>(
  state: WritableDraft<NormalizedObjects<T>>,
  id: string
) => {
  delete state.byId[id];
  state.allIds = state.allIds.filter((idItem) => idItem !== id);
};
