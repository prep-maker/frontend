export type NormalizedObjects<T> = {
  byId: { [id: string]: T };
  allIds: string[];
  current?: string;
};
