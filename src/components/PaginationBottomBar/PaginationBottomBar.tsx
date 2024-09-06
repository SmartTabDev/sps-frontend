import React from 'react';
import {
  Pagination,
  PaginationProps,
  Skeleton,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import BottomBar from 'components/BottomBar/BottomBar';

type PaginationBottomBarProps = {
  isLoading: boolean;
  total: number | undefined;
  pageCount: number | undefined;
  page: number | undefined;
  handlePageChange: PaginationProps['onChange'];
};

export const PaginationBottomBar: React.FC<PaginationBottomBarProps> = ({
  isLoading,
  total,
  pageCount,
  page,
  handlePageChange,
}) => {
  return (
    <BottomBar>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Stack direction="row" spacing={8} />

        <Stack direction="row" spacing={1} alignItems="center">
          {isLoading ? (
            <Skeleton sx={{ width: '100px' }} />
          ) : (
            <Typography sx={{ color: '#3B455E', fontSize: '14px' }}>
              Total offers:{' '}
              <Typography
                sx={{
                  color: 'primary.main',
                  fontSize: '14px',
                }}
                component="span"
              >
                {total}
              </Typography>
            </Typography>
          )}
          {isLoading ? (
            <Skeleton sx={{ width: '300px' }} />
          ) : (
            <Pagination
              count={pageCount}
              color="primary"
              showFirstButton
              showLastButton
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Stack>
    </BottomBar>
  );
};
