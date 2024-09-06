import React from 'react';
import TopProduct from 'components/TopProduct';
import Totals from 'components/Totals';
import { useSelector } from 'react-redux';
import { RecapCardValues } from 'components/Recaps/utils/types';
import TotalAvailability from './components/TotalAvailability';

type Props = {
  url?: string;
};

type Config = {
  title: string;
  values: RecapCardValues[];
};

const Tops: React.FC<{ config: Config[] }> = ({ config }) => (
  <>
    {config.map(({ title, values }, index) => (
      <TopProduct title={title} key={`${title}-${index}`} values={values} />
    ))}
  </>
);

const TotalProducts: React.FC<Props> = ({ url }) => {
  const kpi = useSelector((state: RootState) => state.productAvailability);
  const { availabilityLoading, brands, categories, stores, totals } = kpi;

  const TotalProductsConfig = [
    {
      title: 'Top stores',
      values: stores.map((x) => ({ name: x.name, value: String(x.count) })),
    },
    {
      title: 'Top categories',
      values: categories.map((x) => ({ name: x.name, value: String(x.count) })),
    },
    {
      title: 'Top brands',
      values: brands.map((x) => ({ name: x.name, value: String(x.count) })),
    },
  ];

  return (
    <Totals
      isDataLoading={availabilityLoading}
      leftSideTitle="Total products"
      leftSideChildren={<TotalAvailability totals={totals} />}
      leftSideWidth="30%"
      rightSideChildren={<Tops config={TotalProductsConfig} />}
      rightSideColumns={TotalProductsConfig.length}
      detailsBtnUrl={url}
      minHeight={200}
    />
  );
};

export default TotalProducts;
