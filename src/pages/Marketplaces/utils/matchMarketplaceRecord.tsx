export const matchMarketplaceRecord = <T, >(
  key: keyof T,
  value?: any,
) => (record: T | undefined): boolean => {
    if (record && record[key] && value) {
      return record[key] === value;
    }

    return false;
  };
