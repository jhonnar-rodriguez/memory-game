export const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T>(key: string): T => {
  const storedValue = localStorage.getItem(key);

  return storedValue !== null ? JSON.parse(storedValue) : undefined;
};
