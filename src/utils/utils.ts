const isValidValue = <T extends string>(
  value: string,
  list: T[]
): value is T => {
  return list.includes(value as T);
};

export { isValidValue };
