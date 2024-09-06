export const flatObjectValues = (data: object[] | null) => {
  return (data || []).map((item) => Object.values(item)).flat();
};
