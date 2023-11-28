export const isDefinedAndNotNull = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

export const filterOutNullOrUndefined = <T>(arr: (T | undefined)[]): T[] => {
  return arr.filter(isDefinedAndNotNull);
};
