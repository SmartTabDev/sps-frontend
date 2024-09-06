import React, { useContext, useMemo } from 'react';
import { styled } from '@mui/system';
import ChartWrapper from 'components/CustomLegendChart/ChartWrapper';
import FormatTimeframe, {
  FormatTimeframeDate,
} from 'components/FormatTimeframe/FormatTimeframe';
import moment from 'moment';
import CustomLegend from 'components/CustomLegendChart/CustomLegend';
import NoData from 'components/NoData';
import MarketplaceContext from 'pages/Marketplaces/MarketplaceContext';
import { ConfigContext } from 'contexts/ConfigContext';
import RoundPanel from '../../RoundPanel';
import { usePriceHistoryQuery } from '../../../hooks/usePriceHistoryQuery';
import buildChart from './buildChart';

const StyledRoundPanel = styled(RoundPanel)`
  padding: 25px 20px;
  margin-top: 13px;
  min-height: 347px;
  overflow: visible;
`;

const NoDataWrapper = styled('div')`
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

type Props = {
  productId: string;
};

type ChartTopBarProps = {
  echarts?: echarts.ECharts;
  retailers: string[];
};

const Title: React.FC = () => (
  <div>
    <FormatTimeframeDate variant="h4">
      <FormatTimeframe
        start={moment(Date.now()).subtract(30, 'days')}
        end={moment(Date.now())}
      />
    </FormatTimeframeDate>
  </div>
);

const ChartTopBar: React.FC<ChartTopBarProps> = ({
  echarts,
  retailers,
}): JSX.Element => {
  const data = useMemo<{ name: string }[]>(
    () => retailers.map((r) => ({ name: r })),
    [retailers]
  );

  return (
    <div>
      {echarts && (
        <CustomLegend data={data} echarts={echarts} showData={false} />
      )}
    </div>
  );
};

export const PriceHistory: React.FC<Props> = ({ productId }) => {
  const { regionCode } = useContext(ConfigContext);
  const { marketplace } = useContext(MarketplaceContext);
  const { isLoading, data, retailers } = usePriceHistoryQuery(
    regionCode,
    marketplace,
    productId
  );
  return (
    <StyledRoundPanel>
      <ChartWrapper
        isLoading={isLoading}
        data={data || {}}
        getOption={buildChart}
        renderLegend={(echarts) => (
          <ChartTopBar echarts={echarts} retailers={retailers} />
        )}
        Title={Title}
        legendOrder={0}
        key="price-history"
      />
      {isLoading === false && data.length === 0 && (
        <NoDataWrapper>
          <NoData show showImage={false} />
        </NoDataWrapper>
      )}
    </StyledRoundPanel>
  );
};
