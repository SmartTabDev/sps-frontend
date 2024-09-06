import React, { useCallback } from 'react';

export const usePage = () => {
  const [page, setPage] = React.useState(1);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown> | null, value: number) => {
      setPage(value);
      window.scrollTo(0, 0);
    },
    [setPage]
  );

  return {
    page,
    resetPage,
    handlePageChange,
  };
};
