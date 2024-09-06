import React from 'react';
import TopProduct from 'components/TopProduct';
import Totals from 'components/Totals';
import { RecapCardValues } from 'components/Recaps/utils/types';
import AvgShare from './AvgShare';

type Props = {
  isLoading: boolean;
  config: TopsConfig[];
  avg: number;
  viewDetailsUrl?: string;
  title: string;
};

export type TopsConfig = {
  title: string;
  values: RecapCardValues[];
};

const Tops: React.FC<Omit<Props, 'avg' | 'isLoading' | 'title'>> = ({
  config,
}) => (
  <>
    {config.map(({ title, values }, index) => (
      <TopProduct title={title} values={values} key={`${title}-${index}`} />
    ))}
  </>
);

const TotalShare: React.FC<Props> = ({
  isLoading,
  avg,
  config,
  viewDetailsUrl,
  title,
}) => (
  <Totals
    isDataLoading={isLoading}
    leftSideTitle={title}
    leftSideChildren={<AvgShare value={avg} />}
    rightSideChildren={<Tops config={config} />}
    rightSideColumns={config.length}
    leftSideWidth="250px"
    detailsBtnUrl={viewDetailsUrl}
    minHeight={216}
  />
);

export default TotalShare;
