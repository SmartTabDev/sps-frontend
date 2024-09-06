import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TopsConfig } from 'components/TotalShare'; // TotalShare,
import { buildTable } from 'pages/DigitalShelf/ShareOf/utils/buildTable';
import RecapContainer from 'components/Recaps/RecapContainer';
import { styled } from '@mui/system';
import { RecapWrapper } from 'components/Recaps/RecapWrapper';
import DigitalShelfListRecapCard from 'components/Recaps/DigitalShelfListRecapCard';
import DigitalShelfAvgRecapCard from 'components/Recaps/DigitalShelfAvgRecapCard';
import RecapCardList from 'components/Recaps/RecapCardList';
import { useCardWidth } from 'components/Recaps/hooks/useCardWidth';
import { getTotalShareConfig } from '../../../utils/getTotalShareConfig';
import { AVGData } from '../../types';

const StyledRecapWrapper = styled(RecapWrapper)`
  position: relative;
  width: 100%;
`;

type Props = {
  url?: string;
};

const TotalSearchShare: React.FC<Props> = ({ url }) => {
  const [config, setConfig] = useState<TopsConfig[]>([]);
  const [data, setData] = useState<AVGData>({
    avg: 0,
    columnsAvg: [],
    rowsAvg: [],
  });

  const { categoryShareDetails: details, categoryShareLoading } = useSelector(
    (state: RootState) => state.categoryShare
  );
  const {
    kpi: {
      categoryRetailers,
      links = [],
      categoryLinksCategories: categories = [],
      searchTerms = [],
    },
    isConfigLoading,
  } = useSelector((state: RootState) => state.config);

  useEffect(() => {
    if (details && details.length > 0) {
      const table = buildTable(
        categoryRetailers,
        categories,
        details,
        searchTerms,
        'Category',
        'categoryid'
      );

      setData(table);
    }
  }, [details, categories, links, categoryRetailers, searchTerms]);

  useEffect(() => {
    setConfig(
      getTotalShareConfig(data, categoryRetailers, categories, 'Categories')
    );
  }, [data, categories, categoryRetailers]);

  const avgCard = {
    name: 'Average category share',
    color: '#28A745',
    positive: true,
    value: `${Number(data.avg).toFixed(2)}%`,
    subtitle: undefined,
    series: [],
    showPieChart: true,
  };

  const cards = [
    {
      name: 'Best category',
      color: '#28A745',
      positive: true,
      value: undefined,
      values: config[0]?.values,
      subtitle: undefined,
      series: [],
    },
    {
      name: 'Best retailer',
      color: '#28A745',
      positive: true,
      value: undefined,
      values: config[1]?.values,
      subtitle: undefined,
      series: [],
    },
    {
      name: 'Worst retailer',
      color: '#F00F00',
      positive: false,
      value: undefined,
      values: config[2]?.values,
      subtitle: undefined,
      series: [],
    },
  ];

  const isLoading = categoryShareLoading || isConfigLoading;
  const cardCount = useCardWidth();

  return (
    <>
      <RecapContainer
        Panel={StyledRecapWrapper}
        isLoaded={!isLoading}
        url={url}
        cardCount={cardCount}
      >
        <DigitalShelfAvgRecapCard {...avgCard} />
        <RecapCardList cards={cards} Card={DigitalShelfListRecapCard} />
      </RecapContainer>
    </>
  );
};

export default TotalSearchShare;
