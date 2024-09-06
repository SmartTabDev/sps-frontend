import React from 'react';
import { Skeleton, Typography, Unstable_Grid2 as Grid2 } from '@mui/material';
import { Box } from '@mui/system';
import { formatChangeValue } from 'utils/formatPercentage';
import { StyledSummaryItem } from '../style';
import { EyeLevelRetailerSummaryData } from '../types';

type AverageSummaryProps = {
  isLoading?: boolean;
  data?: EyeLevelRetailerSummaryData;
};

type SummaryItemProps = {
  isLoading?: boolean;
  percent: number;
  title: string;
  smallPercent: number;
};

const SummaryItem: React.FC<SummaryItemProps> = ({
  smallPercent,
  percent,
  title,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <StyledSummaryItem {...{ smallPercent }}>
        <Box>
          <Box display="flex" justifyContent="center">
            <Skeleton variant="rectangular" width={86} height={51} />
            <Box
              sx={{
                position: 'absolute',
                marginLeft: '140px',
              }}
            >
              <Skeleton variant="circular" width={31} height={31} />
            </Box>
          </Box>
        </Box>
        <Box marginTop={1}>
          <Skeleton variant="rectangular" width="100%" height={20} />
        </Box>
      </StyledSummaryItem>
    );
  }
  return (
    <StyledSummaryItem {...{ smallPercent }}>
      <Box position="relative">
        <Box className="smallPercent">
          {smallPercent === 0 ? (
            <Typography className="no-change" component="span">
              nc
            </Typography>
          ) : (
            <>
              <Typography component="span">
                {formatChangeValue(smallPercent)}
              </Typography>
              <Typography component="span" sx={{ color: 'inherit' }}>
                %
              </Typography>
            </>
          )}
        </Box>
        <Typography component="h3" variant="h3">
          {percent}
          <Typography component="span" sx={{ fontWeight: 'inherit' }}>
            %
          </Typography>
        </Typography>
      </Box>
      <Typography component="p" sx={{ lineHeight: '1.2' }}>
        {title}
      </Typography>
    </StyledSummaryItem>
  );
};

export const AverageSummary: React.FC<AverageSummaryProps> = ({
  data,
  isLoading,
}) => {
  return (
    <Grid2
      container
      py={4}
      pl={18.625}
      pr={4.25}
      sx={{
        width: '100%',
        flexWrap: 'nowrap',
      }}
    >
      <SummaryItem
        isLoading={isLoading}
        percent={data?.general ?? 0}
        title="General"
        smallPercent={0}
      />
      <SummaryItem
        isLoading={isLoading}
        percent={data?.shelf ?? 0}
        title="Shelf"
        smallPercent={5}
      />
      <SummaryItem
        isLoading={isLoading}
        percent={data?.content ?? 0}
        title="Content"
        smallPercent={8}
      />
      <SummaryItem
        isLoading={isLoading}
        percent={data?.ratingAndReviews ?? 0}
        title="Ratings & Reviews"
        smallPercent={-6}
      />
      <SummaryItem
        isLoading={isLoading}
        percent={data?.searchVsFairShare ?? 0}
        title="Search"
        smallPercent={4}
      />
    </Grid2>
  );
};
