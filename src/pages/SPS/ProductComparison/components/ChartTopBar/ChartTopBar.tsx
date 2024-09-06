import React from 'react';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import CustomLegend from 'components/CustomLegendChart/CustomLegend';
import TopBarHead from '../TopBarHead';
import TopBar from '../StyledTopBar/StyledTopBar';
import TopBarPanel from '../StyledTopBarPanel/StyledTopBarPanel';

const StyledTopBarPanel = styled(TopBarPanel)`
  box-shadow: none;
`;

const StyledTopBar = styled(TopBar)`
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 25px;
`;

type Props = {
  echarts?: echarts.ECharts;
};

const ChartTopBar: React.FC<Props> = ({ echarts }): JSX.Element => {
  const selectedRetailers = useSelector(
    (state: RootState) => state.productComparison.selectedRetailers,
  );

  return (
    <StyledTopBar>
      <StyledTopBarPanel>
        <TopBarHead showAmounts={false} />
        <CustomLegend data={selectedRetailers} echarts={echarts} showData />
      </StyledTopBarPanel>
    </StyledTopBar>
  );
};

export default ChartTopBar;
