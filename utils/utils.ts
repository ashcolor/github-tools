export const getPropertyValueArray = (objects: T[], property: K): T[K][] => {
  return objects.map((obj) => obj[property]);
};
