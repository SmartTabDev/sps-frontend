export const includeLowerCase = (
  str: string | undefined | null,
  substr: string
): boolean => {
  return (str || '').toLowerCase().includes(substr.toLowerCase());
};
