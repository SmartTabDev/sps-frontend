export const usePagination = (page: number, total: number | undefined) => {
  const limit = 50;
  const pageCount = total ? Math.ceil(total / limit) : 0;
  const offset = page > 1 ? (page - 1) * limit : 0;

  return {
    pageCount,
    offset,
    limit,
  };
};
