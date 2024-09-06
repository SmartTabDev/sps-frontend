import React from 'react';
import { Trends } from 'components/Charts/Trends';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';

type Props = {
  isLoading: boolean;
};

const SalesTrends: React.FC<Props> = ({ isLoading = false }) => {
  // here we gonna use reducers

  return (
    <UnifyCard sx={{ minHeight: '272px' }}>
      {isLoading ? (
        <LoaderWrapper>
          <LinearLoader width={300} />
        </LoaderWrapper>
      ) : (
        <>
          <UnifyCardTitle>Sales trends</UnifyCardTitle>
          <Trends data={[]} XAxisData={[]} isLoading={false} />
        </>
      )}
    </UnifyCard>
  );
};

export default SalesTrends;
