export const getRetailerName = (name: string): string => {
  // eslint-disable-next-line no-useless-escape
  const urlMatch = /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/g;
  const found = name.match(urlMatch);
  let result = name;

  if (found) {
    result = found[0] || '';
  }

  const splited = (result.split(' - ')[0] || '').trim();

  return splited;
};
