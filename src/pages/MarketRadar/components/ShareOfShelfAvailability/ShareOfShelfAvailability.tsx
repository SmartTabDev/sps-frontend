import React from 'react';
import { StackedArea } from 'components/Charts/StackedArea';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';

type Props = {
  isLoading: boolean;
};

const ShareOfShelfAvailability: React.FC<Props> = ({ isLoading = false }) => {
  // here we gonna use reducers

  return (
    <UnifyCard sx={{ minHeight: '272px' }}>
      {isLoading ? (
        <LoaderWrapper>
          <LinearLoader width={300} />
        </LoaderWrapper>
      ) : (
        <>
          <UnifyCardTitle>Share of shelf (available offers)</UnifyCardTitle>
          <StackedArea data={[]} XAxisData={[]} isLoading={false} />
        </>
      )}
    </UnifyCard>
  );
};

export default ShareOfShelfAvailability;
