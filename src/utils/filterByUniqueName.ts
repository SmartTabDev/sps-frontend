export function filterByUniqueName<T extends { name: string }>(arr: T[]): T[] {
  const uniqueNames: string[] = [];
  return arr.filter((item) => {
    if (!uniqueNames.includes(item.name)) {
      uniqueNames.push(item.name);
      return true;
    }
    return false;
  });
}
