import React from 'react';
import { styled } from '@mui/system';
import PanelTitle from 'components/PanelTitle';
import Panel from 'components/Panel';
import ProductsOverTime from 'components/Charts/ProductsOverTime';
import { TotalsOverTime } from 'reducers/productAvailability';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';

const StyledDataBox = styled(Panel)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 0px;
  background-color: ${({ theme }) => theme.palette.common.white};
  width: 100%;

  .echarts-for-react {
    margin-top: 25px;
    width: 100%;
  }
`;

const StyledPanelTitle = styled(PanelTitle)`
  align-self: flex-start;
`;

type Props = {
  data: TotalsOverTime;
  isLoading: boolean;
};

const TotalProductsOverTime: React.FC<Props> = ({ data, isLoading }) => (
  <StyledDataBox>
    {isLoading ? (
      <LoaderWrapper>
        <LinearLoader width={300} />
      </LoaderWrapper>
    ) : (
      <>
        <StyledPanelTitle>Total products over time</StyledPanelTitle>
        <ProductsOverTime {...data} />
      </>
    )}
  </StyledDataBox>
);

export default TotalProductsOverTime;
