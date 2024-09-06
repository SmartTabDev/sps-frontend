import React from 'react';
import Skeleton from '@mui/material/Skeleton';

type SkeletonsProps = {
  horizontalCount: number;
  verticalCount?: number;
  skeletonsWrapper?: React.ComponentType;
  skeletonWrapper?: React.ComponentType;
  disabledSkeletonWrapper?: React.ComponentType;
  disabledIndexes?: number[];
  skeletonHeight?: string;
  skeletonWidths?: string[];
};

const TableSkeletons: React.FC<SkeletonsProps> = ({
  verticalCount = 1,
  horizontalCount,
  skeletonsWrapper = React.Fragment,
  skeletonWrapper = React.Fragment,
  disabledSkeletonWrapper = React.Fragment,
  disabledIndexes = [],
  skeletonHeight,
  skeletonWidths,
}) => {
  const SkeletonsWrapper = skeletonsWrapper;
  const SkeletonWrapper = skeletonWrapper;
  const DisabledSkeletonWrapper = disabledSkeletonWrapper;

  return (
    <>
      {Array(verticalCount)
        .fill('')
        .map((_1, vIndex) => (
          <SkeletonsWrapper key={`v-${vIndex}`}>
            {Array(horizontalCount)
              .fill('')
              .map((_2, hIndex) =>
                !disabledIndexes.includes(hIndex) ? (
                  <SkeletonWrapper key={`h-${hIndex}`}>
                    <Skeleton
                      sx={{
                        height: skeletonHeight,
                        minWidth: (skeletonWidths || [])[hIndex]!,
                      }}
                    />
                  </SkeletonWrapper>
                ) : (
                  <DisabledSkeletonWrapper key={`h-${hIndex}`} />
                )
              )}
          </SkeletonsWrapper>
        ))}
    </>
  );
};

export default TableSkeletons;
